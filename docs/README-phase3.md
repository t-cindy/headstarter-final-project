README.md

# User Stories:
- As a user, I want to be able to like a post so that I can promote what I agree with. Automated Test: Verify that clicking the "like" button increments the like count on the post. Manual Test: Click the "like" button on a post and verify that the like count increases.

- As a user, I want to be able to dislike a post so I can demote what I disagree with. Automated Test: Verify that clicking the "dislike" button increments the dislike count on the post. Manual Test: Click the "dislike" button on a post and verify that the dislike count increases.

- As a user, I want to be able to post a message so I can share ideas. Automated Test: Simulate posting a message and verify that it appears on the user's profile or feed. Manual Test: Post a message and verify that it appears on the user's profile or feed.

- As a user, I want to be able to view posts in order so I can stay up to date with what's going on. Automated Test: Verify that posts are displayed in chronological order on the user's feed. Manual Test: Scroll through the feed and verify that posts are displayed in chronological order.

- As an authenticated user, I want to create a profile so that I can share information about myself with others. Automated Test: Verify that users can create a profile with a username and bio. Manual Test: Create a profile and verify that the information is displayed correctly on the user's profile page.

- As an authenticated user, I want to edit my profile so that I can keep my information up to date. Automated Test: Verify that users can edit their profile information. Manual Test: Edit profile information and verify that the changes are saved.

- As an authenticated user, I want to be able to post more media instead of text. Automated test: verify users can post alternative forms of media. Manual test: attempt to post alternative forms of media.


# Admin Stories:
- As an admin, I want to be able to view and manage user accounts, including the ability to suspend or ban users if necessary. Automated Test: Verify that admins can access a list of user accounts and perform actions such as suspending or banning users. Manual Test: Log in as an admin, access the user management interface, and suspend or ban a user account.

- As an admin, I want to be able to view and moderate user-generated content, including posts, comments, and images, to ensure they comply with community guidelines. Automated Test: Verify that admins can access user-generated content and take actions such as deleting or flagging inappropriate content. Manual Test: Review user-generated content and take appropriate moderation actions.

- As an admin, I want to be able to receive notifications or reports of inappropriate content or behavior and take action to address them. Automated Test: Verify that admins receive notifications or reports of inappropriate content. Manual Test: Trigger a notification or report of inappropriate content and verify that admins receive it.

- As an admin, I want to be able to view analytics and insights to track the app's performance and user growth. Automated Test: Verify that admins can access analytics and insights data, such as user growth and engagement metrics. Manual Test: Access the analytics and insights dashboard and verify that relevant data is displayed correctly.

- As an admin, I want to be able to manage user accounts so that I can maintain the integrity of the platform. Automated Test: Verify that admins can suspend a user account. Manual Test: Suspend a user account and verify that the user is unable to log in.

- As an admin, I want to be able to manage the data and storage on Google. Automated Tests: Verify that the data is ordered by time. Manual test: verify admin can switch the ordering of data to the least recent activity.

# Diagrams: 
- ERD Diagram
    ![alt text](<ERD Diagram Phase 3.png>)
- App Structure
    ![alt text](<App Structure.png>)
- Mock Web/Mobile UI
    ![alt text](<Mock UI Phase 3.png>)
- System Drawing 
    ![alt text](<Team 10 System Diagram Phase3.png>)
- Update state machine
    ![alt text](<Update state machine diagram.png>)


# Routes:
1. GET
    - Set up a route for serving the main page, profile page, and login page.
    - GET route that returns all message, titles, ids, likes, dislikes, comments, likes for comments, dislikes for comments, userid, commentId, session keys.
    - GET route that returns everything for a single row in message table, user table, session table, and comment table.
2. POST
    - POST route for adding a new element to the DataBase for message table, comment table, user table, and session table.
3. PUT
    - PUT route for updating a row in all of the different tables.
4. DELETE
    - DELETE route for removing a row from the tables.

## Unit Test Descriptions 
1. Mobile 
    
    Phase 1
    -  Test UI and Logic of App in Expresso Or Flutter 
    -  Check Upvote/Downvote button function 
    -  Verify message post functions  

    Phase 2
    -  Test OAuth 
    -  Check if User Permissions are Properly modified

    Phase 3 
    - Test writing and reading from local cache 
    - Verify that UI is functioning as intended (idk )

2. Web 

    Phase 1
    -  Test UI and Logic using Jasmine 
    -  Check Upvote/Downvote button function 
    -  Verify message post functions 

    Phase 2 
    -  Test OAuth 
    -  Check if User Permissions are Properly modified

    Phase 3 
    - Check that Users can add links into ideas and comments
    - Verify file upload in idea/comments work as specified 

3. Backend 

    Phase 1
    - Test Routes
    - Verify that requests a accurately affecting Database 
    
    Phase 2
    - Test OAuth Flow 
    - Test Methods that save User ID to hashtable

    Phase 3 
    - Verify that google drive and chache are acessed correctly
    - Check that Routes are correct for files and links 

4. Admin 

    Phase 1
    - Test Table Creation 
    - Test Adding and Dropping Table

    Phase 2 
    - Attempt to make Entry larger than 1024 characters 
    - Test Invalidating Idea/User

    Phase 3
    - Check that Lists and Documents are being shown with ownership and last recently accessed

# Backlogs & Potential Tech Debts
## Backlogs
### Authentication/Authorization
- OAuth Flow Implementation: Ensure secure and efficient authentication using Google Identity Services, handling the domain-specific access (`lehigh.edu`)  
### Upvote/Downvote Mechanism 
- State machine for votes: Implement a state machine for votes that handle transitions between the states up-votes, down-votes, and neutral correctly.
- Secure vote storage: Ensure that votes are stored securely.
### Commenting Mechnism
- Implementation of Comments: Add text-based comment mechanism.
- Edit functionality: Implement functionality for users to edit their comments, keeping in mind how edits are tracked and displayed. 
### User Profiles 
- Inclusive Profile Design: Implement inclusive gender identity options and sexual orientation options (non-binary, LGBTQ+, etc). Ensure the app is inclusive and respects user privacy. 
- Profile Edit and View: Create functionalities for users to view and edit their profiles, including handling personal notes and potentially sensitive information securely.
### Front-End
- Integration with backend: Ensure the web and mobile front-ends interact with the backend correctly for authentication, voting, commenting, and profiles.
- User Interface: Design and implement interfaces for the new features such as voting, commenting and user profiles, which includes mobile responsiveness and accesibility considerations. 
- Insertion of a link in an idea/comment: Ideas have the option to attach a file and that needs to be shown on the frontend.
### Backend 
- Database Schema Changes: The addition of authentication, voting, comments, and extended user profiles will necessitate changes to the database schema, requiring careful migration strategies to avoid data loss or corruption.
- API Routes and Security: Implementing new REST routes for the added functionalities while ensuring they are secure against common web vulnerabilities.
- Caching: Add a memcachier memory cache service as a cache for files downloaded from Google Drive.
### Mobile
- Use the Camera and Gallery APIs to take pictures and post them to the Buzz.
- Implement a local cache.
### Admin 
- Extended so you can list contents, owners, most recent activity on the docs, etc.
### Testing and Refactoring
- Comprehensive Testing: Developing unit, integration, and end-to-end tests for new features, ensuring robustness and preventing regressions.
- Technical Debt Reduction: Identifying and addressing areas of technical debt, such as inefficient code, poorly designed interfaces, or scalability concerns, which could hinder future development.
### Project Management
- Coordination of Team Roles: Effectively assigning roles and managing contributions from team members, ensuring everyone contributes to the project and gains valuable experience.
- Documentation and Code Reviews: Keeping documentation up-to-date with the evolving application design and conducting thorough code reviews to maintain code quality.

## Potential Technical Debt
### Inadequate Testing:
- Insufficient testing due to time constraints can lead to undiscovered bugs and vulnerabilities.
### Hardcoded Solutions: 
- Quick hardcoded solutions in place of flexible systems can create problems in the future.
### Connection to dokku/backend:
- We have been unsuccessful in connecting to the dokku app