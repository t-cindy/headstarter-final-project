# Phase 3 Sprint 13 - PM Report Template
Use this form to provide your project manager report. 

<!-- PM: When editing this template for your submission, you may remove this section -->
## Instructions
Be as thorough and complete as possible, while being brief/concise. Please give detailed answers.

Submit one report per team. This should be submitted by the designated PM, except in approved circumstances. The report should be created as a markdown file (and converted to pdf if required).

In addition to uploading to coursesite, version control this in the `master` branch under the `docs` folder.

## Team Information

### Team Information:

* Number: 10
* Name: qwerty
* Mentor: <Tina Pham, tip226@lehigh.edu>
* Weekly live & synchronous meeting:
    * without mentor: 1
    * with mentor: 1

### Team Roles:

* Project Manger: <Paulius Malcius, pam226@lehigh.edu>
    * Has this changed from last week (if so, why)? No because its the last week for me and last sprint for us as a team
* Backend developer: <Ryan Cleary, ryc221@lehigh.edu>
* Admin developer: <Alex Docu, asd825@lehigh.edu>
* Web developer: <Josh Berdon, job426@lehigh.edu>
* Mobile developer: <Cindy Tran, cit224@lehigh.edu>

### Essential links for this project:

* Team's Dokku URL(s)
    * <https://team-qwerty.dokku.cse.lehigh.edu>
* Team's software repo (bitbucket)
    * <https://bitbucket.org/sml3/cse216_sp24_team_10>
* Team's Jira board
    * <https://cse216-24sp-pam226.atlassian.net/jira/software/projects/P0S1/boards/2>


## Beginning of Phase 3' [20 points total]
Report out on the Phase 3 backlog and any technical debt accrued during Phase 3.

1. What required Phase 3 functionality was not implemented and why? 
    * List this based on a component-by-component basis, as appropriate.
        * Admin-cli
            1. Missing functionality 1: N/a
                * Why: Showing his face, since he is pretty much not in our group.
        * Backend
            1. Missing functionality 1: Routes
                * Why: Getting routes to allow us to adjust user details.
        * Mobile FE
            1. Missing functionality 1: Backend
                * Why: Incorrperate the backend.
            2. Missing functionality 2: Front End
                * Why: Make it look pretier.
        * Web FE
            1. Missing functionality 1: Backend
                * Why: Incorrperate the backend.
            2. Missing functionality 2: Front End
                * Why: Make it look pretier.

2. What technical debt did the team accrue during Phase 3?
    * List this based on a component-by-component basis, as appropriate.
        * Admin-cli
            1. Tech debt item 1: N/a
        * Backend
            1. Tech debt item 1: Getting routes to allow us to adjust user details.
        * Mobile FE
            1. Tech debt item 1: Make it look prettier
            2. Tech debt item 2: Incorperate Backend
        * Web FE
            1. Tech debt item 1: Make it look prettier
            2. Tech debt item 2: Incorperate Backend


## End of Phase 3' [20 points total]
Report out on the Phase 3' backlog as it stands at the conclusion of Phase 3'.

1. What required Phase 3 functionality still has not been implemented or is not operating properly and why?
    - User profile on web and mobile where we can adjust, users messaging and you can see what user it is, user tables works now but everything to do with them is iffy. Overall a good majority is not working properly but the images and files works better. Its really a stuggle here.

2. What technical debt remains?
    - Once again, our group is just behind by a good amount so eveyrhting to do with users is behind. Outside of that I think eveyrhting looks good but the users need to be incorperated into those things for it to work as intended.

3. If there was any remaining Phase 3 functionality that needed to be implemented in Phase 3', what did the PM do to assist in the effort of getting this functionality implemented and operating properly?
    - I helped code, reasearched some problems that occured esspecially in the backend. Overall Cindy as mobile did great so I didnt really need to assist that much for her but everyone else needed a bit of help.

4. Describe how the team worked together in Phase 3'. Were all members engaged? Was the work started early in the week or was there significant procrastination?
    - Well I feel like it was just a normal phase prime for us. We slacked off as much as we slack off every week. It seemed like web and backend started their code on friday so majority of the code was done in one day because the due date for this prime week was on Friday. Alex was more engaged this week but i would say after phase 1 I havent seen him in person in class, recitation, or during our team meetings on friday.

5. What might you suggest the team or the next PM "start", "stop", or "continue" doing in the next Phase (if there were one)?
    - Well to start I would always advise to do what is asked for the upcoming sprint because that is where the points are. To stop is the user stuff since we are getting stuck on that. To continue could be the meetings in person since those make the people work the most and do the most coding wise.

## Role reporting [50 points total]
Report-out on each team members' activity, from the PM perspective (you may seek input where appropriate, but this is primarily a PM related activity).
**In general, when answering the below you should highlight any changes from last week.**

### Back-end
1. Overall evaluation of back-end development (how was the process? was Jira used appropriately? how were tasks created? how was completion of tasks verified?)
    - The backedn is very messed up. We got it to deploy on dokku app. Sprint 2 implemented but not too functional so hard to develop 3rd sprint.
2. List your back-end's REST API endpoints
    - Elephant sql, oauth api, memcacher, google storage api. Messages and links.
3. Assess the quality of the back-end code
    - The code is nonfunctional. It can be improved in the prime sprint. We can get enough for simple demo but need to get our shit together.
4. Describe the code review process you employed for the back-end
    - Checking to make sure the routes were implemented. Getting overview of file storage and caching. Creating a backlog of items to complete for the prime sprint.
5. What was the biggest issue that came up in code review of the back-end server?
    - The backend from the previous sprint not being functional has been a issue. Cant figure out the datarow objects. Incorrect sql querries.
6. Is the back-end code appropriately organized into files / classes / packages?
    - Yeah, it can be refractored to make it more readable. Overall it looks good. 
7. Are the dependencies in the `pom.xml` file appropriate? Were there any unexpected dependencies added to the program?
    - Yes only the required dependencies were added. Nothing more to add here.
8. Evaluate the quality of the unit tests for the back-end
    - The fucntionality was not implemented so tests are still needed to be created. Blame Alex for that.
9. Describe any technical debt you see in the back-end
    - Sprint 2 comments, users, and file.io are not working. This still needs to be fixed for this sprint.

### Admin
1. Overall evaluation of admin app development (how was the process? was Jira used appropriately? how were tasks created? how was completion of tasks verified?)
    - The admin is looking good. There wasnt too much to do but the test. Jira is helpful as a check board for Alex. And verified complication with me.
2. Describe the tables created by the admin app
    - No new tables were created this sprint but there were unit test. We made it so you can also validate messages.
3. Assess the quality of the admin code
    - It seems good. Overall not long so refractoring is not nessessary. The code seems to be well commented so it is also nice.
4. Describe the code review process you employed for the admin app
    - We meet through zoom and I watched his video. Everything seemed well and not problems. Merge was also fine with no merge conflicts.
5. What was the biggest issue that came up in code review of the admin app?
    - Nothing much. Merge was fine and there were no problems with the code. I think the hardest part was communicating with him.
6. Is the admin app code appropriately organized into files / classes / packages?
    - Yes just as stated above everything looks clean and commented. The code also doesnt need refractoring sicne the files arent too long.
7. Are the dependencies in the `pom.xml` file appropriate? Were there any unexpected dependencies added to the program?
    - Nothing new was added so nothing was unexpected. Overall there is nothing I can add to this question.
8. Evaluate the quality of the unit tests for the admin app
    - The unit tests are good. It connects with elephant sql and shows up. We have it ajust the different fields. The quality is all good for me.
9. Describe any technical debt you see in the admin app
    - Admin has no tech debt compared to the other branches. It is the easiest out of the rest of the branches so that is expected. Overall none to minimal tech debt. Maybe some newer mechanics when adding unit test through terminal??.

### Web
1. Overall evaluation of Web development (how was the process? was Jira used appropriately? how were tasks created? how was completion of tasks verified?)
    - Jira was used to help out. He verified his tasks through it as well. Slack check in also helped. The process was kinda rough because the backend is behind.
2. Describe the different models and other templates used to provide the web front-end's user interface
    - The web didnt really use any other templates rather than the ones from the README.md. I guess app.ts manipulates html elements. Index.html containes structure for the webpage.
3. Assess the quality of the Web front-end code
    - The code is mostly good but there is debt. Sprint 3 stuff needs to be connected to bakcend. The bones of the code are there.
4. Describe the code review process you employed for the Web front-end
    - We meet during the week. We also did many slack updates. We also reviewed the revisions we made since I was web last time I had a good idea.
5. What was the biggest issue that came up in code review of the Web front-end?
    - The implementations for the user to upload files. This needs backedns help so thats why we are kinda behind.
6. Is the Web front-end code appropriately organized into files / classes / packages?
    - It is orginized. Could be refractored since the files are getting a little too long. For example app.ts.
7. Are the dependencies in the `package.json` file appropriate? Were there any unexpected dependencies added to the program?
    - No dependencies were added. Therefore there were no unexpected dependencies added to the program.
8. Evaluate the quality of the unit tests for the Web front-end
    - The unit test are good but more tests could be added. THere is a lot of untested functionality in the code. For example, add comments, images, users.
9. Describe any technical debt you see in the Web front-end
    - Mostly the files from this sprint. The implementation was a little behind. We also need to improve a little on the user and comments.

### Mobile
1. Overall evaluation of Mobile development (how was the process? was Jira used appropriately? how were tasks created? how was completion of tasks verified?)
    - Jira was very useful to see what I mobile had to do. The process was good but mentaly bad. 
2. Describe the activities that comprise the Mobile app
    - There is a log in page, google oauth, idea board, message page. Images can be added to each of these ideas, or other attachments. 
3. Assess the quality of the Mobile code
    - The code is alright. The caching and links and attachments are not connected to the backend but everything else is working great.
4. Describe the code review process you employed for the Mobile front-end
    - pull request and reviewsing over slack and our inperson meeting. 
5. What was the biggest issue that came up in code review of the Mobile front-end?
    - Merge conflicts. There were over 300 of them. Moblile fixed it by making a new mobile branch.
6. Is the Mobile front-end code appropriately organized into files / classes / packages?
    - Yes. The code could be refractored a bit. The main dart file is very long. But everything else seems good and readable.
7. Are the dependencies in the `pubspec.yaml` (or build.gradle) file appropriate? Were there any unexpected dependencies added to the program?
    - Yes. Mobile added 5 dependencies to help with the caching, links, and images. 
8. Evaluate the quality of the unit tests for the Mobile front-end here
    - The unit tests are fine, but they dont run? Mobile doesnt know how to run them. Need to talk to last sprint mobile to find out. 
9. Describe any technical debt you see in the Mobile front-end here
    - There are no users. Links arenet connected to backend. Image attachments arent connected to back end. Everyhting is local right now.

### Project Management
1. When did your team meet with your mentor, and for how long?
    - We meet during recitation for 2 hours. We discuessed our problems, and what we need to work on.
2. Describe your use of Jira.  Did you have too much detail?  Too little?  Just enough? Did you implement policies around its use (if so, what were they?)?
    - I had just enought. I put dates, the goals, the roles, the risk. With this I think it was the perfect amount. I dont know what poliies you are talking about but yeahhh.
3. How did you conduct team meetings?  How did your team interact outside of these meetings?
    - We meet both in person and on zoom. We also did a lot on slack and text to discuss questions and problems that arose. In person we meet at FML and then we did a meeting on the weekend on zoom. Also meeting in person during team time given during class.
4. What techniques (daily check-ins/scrums, team programming, timelines, Jira use, group design exercises) did you use to mitigate risk? Highlight any changes from last week.
    - I used slack to see where everyone was at. This was used to do check-ins, and updates. This helped see where we were and see what we will need to put as tech debt.
5. Describe any difficulties you faced in managing the interactions among your teammates. Were there any team issues that arose? If not, what do you believe is keeping things so constructive?
    - Not too many. There were times where the admin didnt communicate too well, but overall it was fine. I guess most people are relying on the backend right now so we really need to work together with that.
6. Describe the most significant obstacle or difficulty your team faced.
    - The backedn. It really needs help so we are really pushing for that. We are meeting with the teacher as well to help figure that out. The thing is we got dokku to work but now we got to eleminate the tech debt.
7. What is your biggest concern as you think ahead to the next phase of the project? To the next sprint?
    - The web and backedn. It seems the web person needs backend to connect the coment and user table for the tech debt to be eliminated. So if we can figure that out ASAP we will be fine.
8. How well did you estimate time during the early part of the phase?  How did your time estimates change as the phase progressed?
    - Well I think our estimate is alwasy on the high side so it wasnt a shocker that it took a while this week. It seems like we have too much debt and we cant make that smaller. Overall in the time frame we have, this project doesnt seem possible for us.
9. What aspects of the project would cause concern for your customer right now, if any?
    - Everything. We are just behind a lot. Like users dont work. Images are doing fine but overall half of the program is ehhhhh. Like customer wouldnt be too happy rn.