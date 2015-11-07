#!/usr/bin/env python2

import argparse
import mechanize
import requests
import sys

class SPOJ:
    def __init__(self):
        self.base_url = 'http://www.spoj.com'
        self.browser = mechanize.Browser()

    def navigate(self, url):
        print 'Navigating to {}'.format(url)
        self.browser.open(url)

    def authenticate(self, username, password):
        self.navigate(self.base_url)
        login_form = self.browser.select_form(predicate=lambda form: form.attrs.get('id') == 'login-form')
        self.browser['login_user'] = username
        self.browser['password'] = password

        print 'Authenticating'
        self.browser.submit()
        cookies = self.browser._ua_handlers['_cookies'].cookiejar
        if not any(c.name == 'SPOJ' for c in cookies):
            raise Exception('Authentication failed')
        print 'Authenticated'

    def edit_contest(self, contest_code, footer_path=None):
        self.navigate('{}/{}/edit'.format(self.base_url, contest_code))
        self.browser.select_form(nr=0)
        if footer_path is not None:
            print 'Changing contest footer to {}'.format(footer_path)
            with open(footer_path, 'r') as footer_file:
                self.browser['body'] = footer_file.read()

        print 'Editing {}'.format(contest_code)
        self.browser.submit()
        print 'Edited {}'.format(contest_code)

    def edit_problem(self, problem_code, body_path=None):
        self.navigate('{}/problems/{}/edit'.format(self.base_url, problem_code))
        self.browser.select_form('editform')
        if body_path is not None:
            print 'Changing problem description to {}'.format(body_path)
            with open(body_path, 'r') as body_file:
                self.browser['body'] = body_file.read()

        print 'Editing {}'.format(problem_code)
        self.browser.submit()
        print 'Edited {}'.format(problem_code)

    def upload(self, contest_code, name, upload_path):
        self.navigate('{}/{}/uploads'.format(self.base_url, contest_code))
        self.browser.select_form(nr=0)
        print 'Adding upload {}'.format(upload_path)
        self.browser['title'] = name
        with open(upload_path, 'r') as upload_file:
            self.browser['content'] = upload_file.read()

        print 'Uploading to {}'.format(contest_code)
        self.browser.submit()
        print 'Uploaded {}'.format(contest_code)

def contest_main(args):
    spoj = SPOJ()
    spoj.authenticate(args.user, args.password)
    spoj.edit_contest(args.contest_code, footer_path=args.footer_file)

def problem_main(args):
    spoj = SPOJ()
    spoj.authenticate(args.user, args.password)
    spoj.edit_problem(args.problem_code, body_path=args.body_file)

def upload_main(args):
    spoj = SPOJ()
    spoj.authenticate(args.user, args.password)
    spoj.upload(args.contest_code, args.name, args.file)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--user')
    parser.add_argument('--password')
    subparsers = parser.add_subparsers()

    subparser = subparsers.add_parser('contest')
    subparser.add_argument('contest_code', help='Alphanumeric contest code')
    subparser.add_argument('--footer-file', help='Footer HTML file')
    subparser.set_defaults(func=contest_main)

    subparser = subparsers.add_parser('problem')
    subparser.add_argument('problem_code', help='Alphanumeric problem code')
    subparser.add_argument('--body-file', help='Problem description file')
    subparser.set_defaults(func=problem_main)

    subparser = subparsers.add_parser('upload')
    subparser.add_argument('contest_code')
    subparser.add_argument('name')
    subparser.add_argument('--file', help='file')
    subparser.set_defaults(func=upload_main)

    args = parser.parse_args()
    args.func(args)
