import sys
import argparse
from workflow import Workflow, web, PasswordNotFound
import json

def slack_keys():
    wf = Workflow()
    try:
        slack_keys = wf.get_password('slack_api_key')
    except PasswordNotFound:
        wf.add_item(title='No API key set. Please run slt',
                    valid=False)
        wf.send_feedback()
        return 0
    keys = slack_keys.split(",")

    return keys

def slack_list(keys):
    wf = Workflow()
    slack_snooze = []

    for key in keys:
        api_key = str(key)
        slack_auth = web.get('https://slack.com/api/auth.test?token=' + api_key + '&pretty=1').json()
        if slack_auth['ok'] is False:
            wf.add_item(title='Authentication failed. Check your API key',
                        valid=False)
            wf.send_feedback()
            break
        else:
            slack_dnd = web.get('https://slack.com/api/dnd.info?token={token}&pretty=1'.format(token=api_key)).json()
            if slack_dnd['snooze_enabled'] is True:
                slack_snooze.append({'team': slack_auth['team'], 'status': 'Snoozed'})
            else:
                slack_snooze.append({'team': slack_auth['team'], 'status': 'Active'})

    return slack_snooze

def search_slack_names(slack_list):
    elements = []
    elements.append(slack_list['team'])
    name_sort = sorted(elements, key=len)
    return u' '.join(name_sort)

def main(wf):

    parser = argparse.ArgumentParser()
    parser.add_argument('--snooze', dest='snooze', nargs='?', default=None)
    parser.add_argument('query', nargs='?', default=60)
    args = parser.parse_args(wf.args)

    if args.snooze:
        query = args.snooze
        carrot = query.find('>')
        team = query[7:(carrot-1)]
        snooze_time = query[carrot+2:]

        for key in slack_keys():
                api_key = str(key)
                slack_auth = web.get('https://slack.com/api/auth.test?token=' + api_key + '&pretty=1').json()
                if slack_auth['ok'] is True and slack_auth['team'] == team:
                    if snooze_time != '0':
                        dnd_url = 'https://slack.com/api/dnd.setSnooze?token={0}&num_minutes={1}'.format(api_key, snooze_time)
                        web.get(dnd_url)
                    else:
                        dnd_url = 'https://slack.com/api/dnd.endSnooze?token={0}'.format(api_key)
                        web.get(dnd_url)

    if len(wf.args):
        query = wf.args[0]

    def wrapper():
        return slack_list(keys=slack_keys())

    slack_snooze = wf.cached_data('slacksnooze', wrapper, max_age=5)

    if query:
        slack_snooze = wf.filter(query, slack_snooze, key=search_slack_names)

    if len(slack_snooze) == 0:
        wf.add_item(title='Enter time in minutes',
            arg=query,
            valid=True)
    else:
        for team in slack_snooze:
            wf.add_item(title='{0} -- Status: {1}'.format(team['team'], team['status']),
            autocomplete='Snooze {0} > '.format(team['team']),
            arg=query,
            valid=True)

    wf.send_feedback()

if __name__==u"__main__":
    wf = Workflow()
    sys.exit(wf.run(main))