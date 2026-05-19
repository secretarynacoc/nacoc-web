Goal
cms.nacoc.org = WordPress admin/CMS on SiteGround
nacoc.org and www.nacoc.org = frontend on AWS Amplify
Part 1: Prepare before moving
Create a full backup
In Site Tools > Security > Backups
create an on-demand backup if available
Confirm the subdomain exists
in Site Tools > Domain > Subdomains
make sure cms.nacoc.org is listed
Enable SSL for cms.nacoc.org
in Site Tools > Security > SSL Manager
select cms.nacoc.org
install an SSL certificate if not active
Optional but recommended
put the site in maintenance mode during the move
this avoids content changes while URLs are being updated
Part 2: Move WordPress from nacoc.org to cms.nacoc.org
Open Site Tools > WordPress > Install & Manage
Find the current WordPress installation for nacoc.org
Click Actions
Choose Move Application
Select cms.nacoc.org
Leave the path empty unless you want WordPress in a subfolder
Confirm the move
This is the best method when both are under the same site.

Part 3: Check WordPress after the move
After the move, test these first:

Admin login
https://cms.nacoc.org/wp-admin
REST API
https://cms.nacoc.org/wp-json
Frontend on the CMS subdomain
open a few pages and posts
check images, menus, forms, plugins
Permalinks
in WordPress go to Settings > Permalinks
click Save Changes
Clear cache
clear any WordPress/plugin cache
clear browser cache too
Part 4: Fix anything that still uses nacoc.org
Sometimes a move is successful but some content still points to the old domain.

Check these:

WordPress URLs
in Settings > General
confirm both are:
https://cms.nacoc.org
Mixed or hardcoded links
if pages, images, or buttons still use nacoc.org, run a serialized-safe search/replace in WordPress
replace:
https://nacoc.org
with https://cms.nacoc.org
Redirect rules
check .htaccess
remove any rule that forces traffic back to nacoc.org
Plugin/app settings
some plugins store full URLs in their own settings
check SEO, forms, security, redirects, custom fields, and API plugins
Third-party callbacks
update any service using the old domain:
forms
reCAPTCHA
OAuth/login apps
webhooks
payment callbacks
newsletter integrations
Part 5: Prepare the headless connection
Before pointing the main domain to Amplify, verify the CMS is ready for headless use.

Check:

REST API works
https://cms.nacoc.org/wp-json
CORS
if Amplify frontend will request data from cms.nacoc.org, CORS may need to allow https://nacoc.org
Preview/auth flows
if your frontend uses previews or authenticated requests, test them before DNS cutover
Admin protection
since cms.nacoc.org/wp-admin will be public, secure it with:
strong admin password
2FA if used
login protection/security rules
Part 6: Only now point nacoc.org to AWS Amplify
Do this after cms.nacoc.org is fully working.

If your DNS is managed here, edit it in:

Site Tools > Domain > DNS Zone Editor
Keep nameservers at SiteGround
Do not move nameservers if you want this split setup managed here.

Change only these records
Update:

Root domain
Host: @
set it to the value AWS Amplify provides
www
Host: www
set it to the value AWS Amplify provides
Keep this unchanged
cms
Host: cms
keep it pointing to SiteGround
So the final result is:

nacoc.org → AWS Amplify
www.nacoc.org → AWS Amplify
cms.nacoc.org → SiteGround
Part 7: What records to use for Amplify
Use the exact values AWS Amplify gives you.

Usually this is one of these patterns:

A record for @
CNAME for www
or another provider-specific combination.

Use the exact Amplify targets shown in AWS.

Part 8: After DNS changes
Wait for propagation
usually a few hours
can take up to 24–48 hours
Test:
nacoc.org → should load Amplify
www.nacoc.org → should load Amplify
cms.nacoc.org/wp-admin → should load WordPress on SiteGround
cms.nacoc.org/wp-json → should return API data
If something looks wrong:
clear local/browser DNS cache
test in incognito/private mode
Part 9: Recommended final checks
After everything is live, verify:

WordPress login works on cms.nacoc.org
media uploads work
REST API works from the frontend
forms and outbound emails work
cron jobs/scheduled publishing work
no redirects send users from cms.nacoc.org to nacoc.org
SSL is valid on both the Amplify site and cms.nacoc.org
Rollback plan
If needed, rollback is simple:

point @ and www back to SiteGround in DNS Zone Editor
keep cms as it is
clear cache and retest
Best timing
The best moment to point nacoc.org to Amplify is:

after the move is complete
after cms.nacoc.org/wp-admin works
after cms.nacoc.org/wp-json works
after links, media, and plugin settings are confirmed
If you want, we can also give you a record-by-record DNS example for @, www, and cms once you have the exact Amplify DNS targets.