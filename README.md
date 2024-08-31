# CSE 216 - Software Engineering Tutorials
This is an individual student repository. It is intended for use during phase 0.

## Details
- Semester: Spring 2024
- Team Number: 10
- Team Name: qwerty
- Bitbucket Repository: https://bitbucket.org/sml3/cse216_sp24_team_10s

## Team Information

- Team Number: 10
- Team Name: qwerty

## Team Members and Roles

- Cindy (cit224@lehigh.edu) - Backend
- Josh (job426@lehigh.edu) - PM
- Alex (asd825@lehigh.edu) - Mobile
- Paulius (pam226@lehigh.edu) - Admin
- Ryan (ryc221@lehigh.edu) - Web

## Project URLs

- Git Repo URL: https://bitbucket.org/sml3/cse216_sp24_team_10
- Jira Board URL: https://cse216-24sp-pam226.atlassian.net/jira/software/projects/P0S1/boards/2
- Backend URL: https://team-qwerty.dokku.cse.lehigh.edu

## Tagged Release Function

- Fixed up the images and files added to messages 
- Updated web frontend
- Did more tech debt from last sprints
- User table and caching for backend

## Run locally and on Dokku
* Running locally: 
    * `mvn package; PORT=8998 DATABASE_URL=postgres://oqjtoetl:****@ruby.db.elephantsql.com/oqjtoetl MEMCACHED_SERVERS=mc3.dev.ec2.memcachier.com:11211 MEMCACHED_USERNAME=45A138 MEMCACHED_PASSWORD=***** mvn exec:java`
* Running dokku app: 
    * Ensure you are in the root of the backend branch. Run `ssh -i ~/.ssh/id_ed25519 -t dokku@dokku.cse.lehigh.edu 'ps:start team-qwerty` to start the app then `git push dokku backend-dokku:main` (or master) to deploy
