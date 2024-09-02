// Prevent compiler errors when using jQuery.  "$" will be given a type of 
// "any", so that we can use it anywhere, and assume it has any fields or
// methods, without the compiler producing an error.
var $: any;

// The 'this' keyword does not behave in JavaScript/TypeScript like it does in
// Java.  Since there is only one NewEntryForm, we will save it to a global, so
// that we can reference it from methods of the NewEntryForm in situations where
// 'this' won't work correctly.
var newEntryForm: NewEntryForm;
var editEntryForm: EditEntryForm;
var expandMessageForm: ExpandMessageForm;

/**
 * NewEntryForm encapsulates all of the code for the form for adding an entry 
 */
class NewEntryForm {
    /**
     * To initialize the object, we say what method of NewEntryForm should be
     * run in response to each of the form's buttons being clicked.
     */
    constructor() {
        document.getElementById("addCancel")?.addEventListener("click", (e) => {newEntryForm.clearForm();});
        document.getElementById("addButton")?.addEventListener("click", (e) => {newEntryForm.submitForm();});
    }

    /**
     * Clear the form's input fields
     */
    clearForm() {
        // reset the UI
        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
        (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
        (<HTMLElement>document.getElementById("showElements")).style.display = "block";
        (<HTMLInputElement>document.getElementById("newTitle")).value = "";
        (<HTMLInputElement>document.getElementById("newMessage")).value = "";
        (<HTMLInputElement>document.getElementById("newLink")).value = ""; // Clear the link field
        (<HTMLInputElement>document.getElementById("newFile")).value = ""; // Clear the file field
    }

   /**
     * Check if the input fields are both valid, and if so, do an AJAX call.
     */
    submitForm() {
        //window.alert("Submit form called.");
        // get the values of the two fields, force them to be strings, and check 
        // that neither is empty
        let mtitle = "" + (<HTMLInputElement>document.getElementById("newTitle")).value;
        let msg = "" + (<HTMLInputElement>document.getElementById("newMessage")).value;
        let link = "" + (<HTMLInputElement>document.getElementById("newLink")).value; // Get the link
        let fileInput = <HTMLInputElement>document.getElementById("newFile");
        let file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null; // Get the file, or null if no files are selected
        let userID = parseInt(sessionStorage.getItem('userId') || '1');
        let mlikes = parseInt((<HTMLInputElement>document.getElementById("newLikes")).value) || 0;
        let mdislikes = parseInt((<HTMLInputElement>document.getElementById("newDislikes")).value) || 0;
        let misValid = true;

        if (mtitle === "" || msg === "") {
            window.alert("Error: title or message is not valid");
            return;
        }

        // set up an AJAX POST. 
        // When the server replies, the result will go to onSubmitResponse
        const doAjax = async () => {
            console.log("Submitting:", 
            { userId: userID,
                mTitle: mtitle,
                mMessage: msg,
                mLink: link, // Include the link
                mFile: file, // Include the file
                mLikes: mlikes,
                mDislikes: mdislikes,
                mValid: misValid });

                let formData = new FormData();
                formData.append('userId', userID.toString());
                formData.append('mTitle', mtitle);
                formData.append('mMessage', msg);
                formData.append('mLink', link);
                if (file instanceof File) {
                    formData.append('mFile', file);
                }
                formData.append('mLikes', mlikes.toString());
                formData.append('mDislikes', mdislikes.toString());
                formData.append('mValid', misValid.toString());

            await fetch('/messages', {
                method: 'POST',
                body: JSON.stringify({
                    userId: userID,
                    mTitle: mtitle,
                    mMessage: msg,
                    mLikes: mlikes,
                    mDislikes: mdislikes,
                    mValid: misValid
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                cache: 'no-store' // This line disables caching for this request
            }).then( (response) => {
                // If we get an "ok" message, return the json
                if (response.ok) {
                    return Promise.resolve( response.json() );
                }
                // Otherwise, handle server errors with a detailed popup message
                else{
                    window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                }
                return Promise.reject(response);
            }).then( (data) => {
                newEntryForm.onSubmitResponse(data);
                mainList.refresh();
            }).catch( (error) => {
                console.warn('Something went wrong.', error);
                window.alert("Unspecified error");
            });
        }

        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    }

    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a 
     * result.
     * 
     * @param data The object returned by the server
     */
    private onSubmitResponse(data: any) {
        // If we get an "ok" message, clear the form
        if (data.mStatus === "ok") {
            newEntryForm.clearForm();
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    }
} // end class NewEntryForm


/**
 * EditEntryForm encapsulates all of the code for the form for editing an entry
 */
class EditEntryForm {
    /**
     * To initialize the object, we say what method of EditEntryForm should be
     * run in response to each of the form's buttons being clicked.
     */
    constructor() {
        document.getElementById("editCancel")?.addEventListener("click", (e) => {editEntryForm.clearForm();});
        document.getElementById("editButton")?.addEventListener("click", (e) => {editEntryForm.submitForm();});
    }

    /**
     * init() is called from an AJAX GET, and should populate the form if and 
     * only if the GET did not have an error
     */
    init(data: any) {
        // If we get an "ok" message, fill in the edit form
        if (data.mStatus === "ok") {
            (<HTMLInputElement>document.getElementById("editTitle")).value = data.mData.mTitle;
            (<HTMLInputElement>document.getElementById("editMessage")).value = data.mData.mContent;
            (<HTMLInputElement>document.getElementById("editId")).value = data.mData.messageId;
            (<HTMLInputElement>document.getElementById("editCreated")).value = data.mData.mCreated;
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    }

    /**
     * Clear the form's input fields
     */
    clearForm() {
        // reset the UI
        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
        (<HTMLElement>document.getElementById("showElements")).style.display = "block";
        (<HTMLInputElement>document.getElementById("editTitle")).value = "";
        (<HTMLInputElement>document.getElementById("editMessage")).value = "";
        (<HTMLInputElement>document.getElementById("editId")).value = "";
        (<HTMLInputElement>document.getElementById("editCreated")).value = "";
    }

    /**
     * Check if the input fields are both valid, and if so, do an AJAX call.
     */
    submitForm() {
        // window.alert("Submit edit form called.");
        // get the values of the two fields, force them to be strings, and check
        // that neither is empty
        let title = "" + (<HTMLInputElement>document.getElementById("editTitle")).value;
        let msg = "" + (<HTMLInputElement>document.getElementById("editMessage")).value;
        // NB: we assume that the user didn't modify the value of editId
        let id = "" + (<HTMLInputElement>document.getElementById("editId")).value;
        if (title === "" || msg === "" || id === "") { 
            window.alert("Error: title, message, or id is not valid");
            return;
        }

        // set up an AJAX PUT.
        // When the server replies, the result will go to onSubmitResponse
        const doAjax = async () => {
            await fetch(`/messages/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    mTitle: title,
                    mMessage: msg
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                cache: 'no-store' // This line disables caching for this request
            }).then( (response) => {
                // If we get an "ok" message, return the json
                if (response.ok) {
                    // return response.json();
                    return Promise.resolve( response.json() );
                }
                // Otherwise, handle server errors with a detailed popup message
                else{
                    window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                }
                // return response;
                return Promise.reject(response);
            }).then( (data) => {
                editEntryForm.onSubmitResponse(data);
                console.log(data);
            }).catch( (error) => {
                console.warn('Something went wrong.', error);
                window.alert("Unspecified error");
            });
        }

        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    }

    /**
     * onSubmitResponse runs when the AJAX call in submitForm() returns a 
     * result.
     * 
     * @param data The object returned by the server
     */
    private onSubmitResponse(data: any) {
        // If we get an "ok" message, clear the form and refresh the main 
        // listing of messages
        if (data.mStatus === "ok") {
            editEntryForm.clearForm();
            mainList.refresh();
        }
        // Handle explicit errors with a detailed popup message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        }
        // Handle other errors with a less-detailed popup message
        else {
            window.alert("Unspecified error");
        }
    }
} //end class EditEntryForm


// Define the class ExpandMessageForm to manage the functionality related to expanding a message
class ExpandMessageForm {

    // Constructor initializes the class
    constructor(){
        // Add click event listener to the 'Close' button
        // When the 'Close' button is clicked, it calls the clearForm method of the newEntryForm to reset UI state
        document.getElementById("expandClose")?.addEventListener("click", (e) => {newEntryForm.clearForm();});

        // Move the event listener setup here from the init method
        document.getElementById("messageLikeCount")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.likeMessage();
        });

        // Move the event listener setup here from the init method
        document.getElementById("messageDislikeCount")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.dislikeMessage();
        });

        document.getElementById("messageComment")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.commentMessage();
        });
    }

    /**
     * The init method is called with data retrieved from an AJAX GET request.
     * This method populates the expand message form if the GET request was successful.
     * @param data The data object returned by the server, which includes the status and message details.
     */
    init(data: any) {
        // Check if the server returned an "ok" status
        if (data.mStatus === "ok") {
            // If so, populate the form fields with the data received from the server
            (<HTMLInputElement>document.getElementById("messageTitle")).textContent = data.mData.mTitle;
            (<HTMLInputElement>document.getElementById("messageContent")).textContent = data.mData.mContent;
            
            (<HTMLInputElement>document.getElementById("messageID")).textContent = "Message  " + data.mData.messageId;
            (<HTMLInputElement>document.getElementById("messageLikeCount")).innerHTML = '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;' + data.mData.mLikes;
            (<HTMLElement>document.getElementById("messageLikeCount")).setAttribute("data-value", data.mData.messageId); // Set the data-value to the message ID
            // Additional fields like created date could also be populated here if needed
            (<HTMLInputElement>document.getElementById("messageDislikeCount")).innerHTML = '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>&nbsp;' + data.mData.mDislikes;
            (<HTMLElement>document.getElementById("messageDislikeCount")).setAttribute("data-value", data.mData.messageId); // Set the data-value to the message ID
            
            (<HTMLInputElement>document.getElementById("messageComment")).innerHTML = '<i class="fa fa-reply-all" aria-hidden="true"></i>';
            (<HTMLElement>document.getElementById("messageComment")).setAttribute("data-value", data.mData.messageId); // Set the data-value to the message ID


            (<HTMLElement>document.getElementById("addElement")).style.display = "none";
            (<HTMLElement>document.getElementById("expandMessage")).style.display = "block";
            (<HTMLElement>document.getElementById("showElements")).style.display = "none";
            (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        } 
        // If the server returned an "error" status, show a detailed error message
        else if (data.mStatus === "error") {
            window.alert("The server replied with an error:\n" + data.mMessage);
        } 
        // For any other server response status, show a generic error message
        else {
            window.alert("Unspecified error...The problem I despise");
        }
    }

    /**
     * The clearForm method resets the UI state, hiding the expand message form and showing the main elements.
     */
    clearForm() {
        // Hide the add and expand message sections
        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
        (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        // Show the main list of messages
        (<HTMLElement>document.getElementById("showElements")).style.display = "block";
    }

    likeMessage() {
        const id = document.getElementById("messageLikeCount")?.getAttribute("data-value");

        if(id){
            let is_liked = 0;
            // Issue an AJAX POST and then pass, then confirm idea was liked to user
            for( let i = 0; i < already_liked.length; i++ ){
                if(id == already_liked[i]){
                    is_liked = 1;
                    already_liked.splice(i, 1);
                }
            }
            
            if(is_liked == 0){
                const doAjax = async () => {
                    await fetch(`/messages/${id}/like`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        cache: 'no-store' // This line disables caching for this request
                    }).then( (response) => {
                        if (response.ok) {
                            // Like Request was successfully processed
                            //window.alert(`Message Liked!`);
                            if(id !== null){already_liked.push(id);}
                            this.refresh(id);
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                        mainList.refresh();
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            } else{
                const doAjax = async () => {
                    await fetch(`/messages/${id}/unlike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        cache: 'no-store' // This line disables caching for this request
                    }).then( (response) => {
                        if (response.ok) {
                            // Unlike Request was successfully processed
                            //window.alert(`Like Removed!`);
                            this.refresh(id);
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                        mainList.refresh();
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            }
        } else {
            window.alert('Could not find a likbtn with a data-value attribute');
            console.warn('Could not find a likbtn with a data-value attribute');
        }
        
    }

    dislikeMessage() {
        const id = document.getElementById("messageDislikeCount")?.getAttribute("data-value");

        if(id){
            let is_disliked = 0;
            // Issue an AJAX POST and then pass, then confirm idea was liked to user
            for( let i = 0; i < already_disliked.length; i++ ){
                if(id == already_disliked[i]){
                    is_disliked = 1;
                    already_disliked.splice(i, 1);
                }
            }
            
            if(is_disliked == 0){
                const doAjax = async () => {
                    await fetch(`/messages/${id}/dislike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        cache: 'no-store' // This line disables caching for this request
                    }).then( (response) => {
                        if (response.ok) {
                            // Like Request was successfully processed
                            //window.alert(`Message Liked!`);
                            if(id !== null){already_disliked.push(id);}
                            this.refresh(id);
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                        mainList.refresh();
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            } else{
                const doAjax = async () => {
                    await fetch(`/messages/${id}/undislike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        cache: 'no-store' // This line disables caching for this request
                    }).then( (response) => {
                        if (response.ok) {
                            // Unlike Request was successfully processed
                            //window.alert(`Like Removed!`);
                            this.refresh(id);
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                        mainList.refresh();
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            }
        } else {
            window.alert('Could not find a dislikbtn with a data-value attribute');
            console.warn('Could not find a dislikbtn with a data-value attribute');
        }
        
    }

    
    commentMessage() {
        const id = document.getElementById("messageComment")?.getAttribute("data-value");
        const comment = (<HTMLInputElement>document.getElementById("comment")).value;
    
        if (id && comment.trim() !== "") {
            const doAjax = async () => {
                await fetch(`/messages/${id}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({ comment: comment })  // Make sure to send the comment as part of the request body
                }).then((response) => {
                    if (response.ok) {
                        return Promise.resolve(response.json());
                    } else {
                        window.alert(`Failed to post comment: ${response.status}\n${response.statusText}`);
                    }
                    return Promise.reject(response);
                }).then((data) => {
                    if (data && data.mStatus === "ok") {
                        console.log("Comment added successfully:", data);
                        this.refresh(id);  // Optionally refresh the message to show the new comment
                    } else {
                        console.warn("Failed to add comment:", data);
                    }
                }).catch((error) => {
                    console.error('Something went wrong when posting comment:', error);
                    window.alert("Error posting comment");
                });
            };
    
            // Execute the AJAX call
            doAjax().then(console.log).catch(console.error);
        } else {
            window.alert('Please write a comment before submitting.');
        }
    }

    refresh(id: string) {
        const doAjax = async () => {
            await fetch(`/messages/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                // If we get an "ok" message, clear the form
                if (response.ok) {
                    return Promise.resolve(response.json());
                }
                // Otherwise, handle server errors with a detailed popup message
                else {
                    window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                }
                return Promise.reject(response);
            }).then((data) => {
                // Update UI with the new likes count
                if (data.mStatus === "ok" && data.mData) {
                    const likeCountElement = document.getElementById("messageLikeCount");
                    if (likeCountElement) {
                        likeCountElement.innerHTML = '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;' + data.mData.mLikes;
                    }
                    const dislikeCountElement = document.getElementById("messageDislikeCount");
                    if (dislikeCountElement) {
                        dislikeCountElement.innerHTML = '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>&nbsp;' + data.mData.mDislikes;
                    }
                }
                console.log(data);
            }).catch((error) => {
                console.warn('Something went wrong.', error);
                window.alert("Unspecified error");
            });
        }
    
        // make the AJAX get and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    }
    
    


}


// a global for the main ElementList of the program.  See newEntryForm for 
// explanation
var mainList: ElementList;
//Global Variables for tracking liked posts 
let already_liked = [''];
let already_disliked = [''];

/**
 * ElementList provides a way of seeing all of the data stored on the server.
 */
class ElementList {
    // I though about it and it makes no sense to refresh every 2 seconds. It should only refresh when you
    // send a new message or when you click a refresh button. I will make one to just refresh messages not website.
    /*
    // this starts the period refresh that happends every 2 seconds. So no need to press refresh everytime you get new message
    constructor() {
        this.startPeriodicRefresh();
    }

    startPeriodicRefresh() {
        //this.refresh();
        // Call refresh method every 2 seconds (2000 milliseconds)
        setInterval(() => this.refresh(), 2000);
    }
    */

    /**
     * refresh is the public method for updating messageList
     */
    refresh() {
        // Issue an AJAX GET and then pass the result to update(). 
        const doAjax = async () => {
            await fetch('/messages', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then( (response) => {
                // If we get an "ok" message, clear the form
                if (response.ok) {
                    return Promise.resolve( response.json() );
                }
                // Otherwise, handle server errors with a detailed popup message
                else{
                    window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                }
                return Promise.reject(response);
            }).then( (data) => {
                mainList.update(data);
                console.log(data);
            }).catch( (error) => {
                console.warn('Something went wrong.', error);
                window.alert("Unspecified error");
            });
        }

        // make the AJAX post and output value or error message to console
        doAjax().then(console.log).catch(console.log);
    }

    /*
     * clickLike is the code we run in response to a click of a Like button
     */
    private clickLike(e: Event) {
        const targetElement = (<HTMLElement>e.target).closest('.likbtn');

        // Check if the targetElement is not null and has the attribute "data-value"
        if (targetElement && targetElement.hasAttribute("data-value")) {
            // as in clickDelete, we need the ID of the row
            const id = targetElement.getAttribute("data-value");
            
            //Track which ideas have been liked by user
            let is_liked = 0;
            // Issue an AJAX POST and then pass, then confirm idea was liked to user
            for( let i = 0; i < already_liked.length; i++ ){
                if(id == already_liked[i]){
                    is_liked = 1;
                    already_liked.splice(i, 1);
                }
            }
            
            if(is_liked == 0){
                const doAjax = async () => {
                    await fetch(`/messages/${id}/like`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    }).then( (response) => {
                        if (response.ok) {
                            // Like Request was successfully processed
                            //window.alert(`Message Liked!`);
                            if(id !== null){already_liked.push(id);}
                            this.refresh();
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                    
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            } else{
                const doAjax = async () => {
                    await fetch(`/messages/${id}/unlike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    }).then( (response) => {
                        if (response.ok) {
                            // Unlike Request was successfully processed
                            //window.alert(`Like Removed!`);
                            this.refresh();
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                    
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            }
        } else {
            window.alert('Could not find a likbtn with a data-value attribute');
            console.warn('Could not find a likbtn with a data-value attribute');
        }

    }

    /*
     * clickDislike is the code we run in response to a click of a Like button
     */
    private clickDislike(e: Event) {
        const targetElement = (<HTMLElement>e.target).closest('.dislikbtn');

        // Check if the targetElement is not null and has the attribute "data-value"
        if (targetElement && targetElement.hasAttribute("data-value")) {
            // as in clickDelete, we need the ID of the row
            const id = targetElement.getAttribute("data-value");
            
            //Track which ideas have been liked by user
            let is_disliked = 0;
            // Issue an AJAX POST and then pass, then confirm idea was liked to user
            for( let i = 0; i < already_disliked.length; i++ ){
                if(id == already_disliked[i]){
                    is_disliked = 1;
                    already_disliked.splice(i, 1);
                }
            }
            
            if(is_disliked == 0){
                const doAjax = async () => {
                    await fetch(`/messages/${id}/dislike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    }).then( (response) => {
                        if (response.ok) {
                            // Like Request was successfully processed
                            //window.alert(`Message Liked!`);
                            if(id !== null){already_disliked.push(id);}
                            this.refresh();
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                    
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            } else{
                const doAjax = async () => {
                    await fetch(`/messages/${id}/undislike`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    }).then( (response) => {
                        if (response.ok) {
                            // Unlike Request was successfully processed
                            //window.alert(`Like Removed!`);
                            this.refresh();
                            return Promise.resolve( response.json() );
                        }
                        else{
                            window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                        }
                        return Promise.reject(response);
                    }).then( (data) => {
                    
                        console.log(data);
                    }).catch( (error) => {
                        console.warn('Something went wrong.', error);
                        window.alert("Unspecified error");
                    });

                }
                // make the AJAX post and output value or error message to console
                doAjax().then(console.log).catch(console.log);
            }
        } else {
            window.alert('Could not find a dislikbtn with a data-value attribute');
            console.warn('Could not find a dislikbtn with a data-value attribute');
        }

    }

    private clickExpandMessage(e: Event) {
        // Use .closest to find the nearest parent (or self) that matches the selector
        // This is useful in case the click event is triggered on a child element
        const targetElement = (<HTMLElement>e.target).closest('.message-container');
        
        // Check if the targetElement is not null and has the attribute "data-value"
        if (targetElement && targetElement.hasAttribute("data-value")) {
            const id = targetElement.getAttribute("data-value");
            // window.alert(id); // Should now correctly display the id. Testing reasons
    
            const doAjax = async () => {
                await fetch(`/messages/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then((response) => {
                    if (response.ok) {
                        (<HTMLElement>document.getElementById("expandMessage")).style.display = "block";
                        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
                        (<HTMLElement>document.getElementById("showElements")).style.display = "none";
                        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
                        return Promise.resolve(response.json());
                    } else {
                        window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                    }
                    return Promise.reject(response);
                }).then((data) => {
                    expandMessageForm.init(data);
                    console.log(data);
                }).catch((error) => {
                    console.warn('Something went wrong.', error);
                    window.alert("Unspecified error...oh peepee");
                });
            };
            doAjax().then(console.log).catch(console.log);
        } else {
            window.alert('Could not find a message container with a data-value attribute');
            console.warn('Could not find a message container with a data-value attribute');
        }
    }

    /**
     * clickEdit is the code we run in response to a click of a delete button
     */
    private clickEdit(e: Event) {
        const targetElement = (<HTMLElement>e.target).closest('.editbtn');

        // Check if the targetElement is not null and has the attribute "data-value"
        if (targetElement && targetElement.hasAttribute("data-value")) {
            // as in clickDelete, we need the ID of the row
            const id = targetElement.getAttribute("data-value");
    
            // Issue an AJAX GET and then pass the result to editEntryForm.init()
            const doAjax = async () => {
                await fetch(`/messages/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then( (response) => {
                    if (response.ok) {
                        // show the edit form
                        (<HTMLElement>document.getElementById("editElement")).style.display = "block";
                        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
                        (<HTMLElement>document.getElementById("showElements")).style.display = "none";
                        (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
                        return Promise.resolve( response.json() );
                    }
                    else{
                        window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                    }
                    return Promise.reject(response);
                }).then( (data) => {
                    editEntryForm.init(data);
                    this.refresh();
                    console.log(data);
                }).catch( (error) => {
                    console.warn('Something went wrong.', error);
                    window.alert("Unspecified error");
                });
            }
    
            // make the AJAX post and output value or error message to console
            doAjax().then(console.log).catch(console.log);
        }
    }

    /**
     * clickDelete is the code we run in response to a click of a delete button
     */
    private clickDelete(e: Event) {
        const targetElement = (<HTMLElement>e.target).closest('.message-container');
        
        // Check if the targetElement is not null and has the attribute "data-value"
        if (targetElement && targetElement.hasAttribute("data-value")) {
            const id = targetElement.getAttribute("data-value");

            // Issue an AJAX DELETE and then invoke refresh()
            const doAjax = async () => {
                await fetch(`/messages/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then( (response) => {
                    if (response.ok) {
                        //window.alert(`Message Deleted`);
                        return Promise.resolve( response.json() );
                    }
                    else{
                        window.alert(`The server replied not ok: ${response.status}\n` + response.statusText);
                    }
                    return Promise.reject(response);
                }).then( (data) => {
                    mainList.refresh();
                    console.log(data);
                }).catch( (error) => {
                    console.warn('Something went wrong.', error);
                    window.alert("Unspecified error");
                });
            }

            
            // make the AJAX post and output value or error message to console
            doAjax().then(console.log).catch(console.log);

        }

    // TODO: we've repeated the same pattern 3+ times now, so we should really
    //   think about refactoring and abstracting this boilerplate into something
    //   easier to reuse, if possible 
    }

    private update(data: any) {
        let elem_messageList = document.getElementById("messageList");
    
        if(elem_messageList !== null) {
            elem_messageList.innerHTML = "";
    
            console.log("Data received: ", data);
    
            // Ensure data.mData is an array before proceeding
            if (data.mData && Array.isArray(data.mData)) {
                // Sort messages by id in descending order
                data.mData.sort((a: any, b: any) => b.messageId - a.messageId);
    
                data.mData.forEach((message: any) => {
                    let messageDiv = document.createElement('div');
                    messageDiv.classList.add("message-container");
                    messageDiv.setAttribute('data-value', message.messageId.toString()); // Set data-value attribute to message ID
    
                    let idDiv = document.createElement('div');
                    idDiv.textContent = "Idea #" + message.messageId;
                    messageDiv.appendChild(idDiv);
    
                    let titleDiv = document.createElement('div');
                    titleDiv.textContent = message.mTitle;
                    messageDiv.appendChild(titleDiv);
    
                    let likesDiv = document.createElement('div');
                    likesDiv.textContent = "Likes: " + message.mLikes;
                    messageDiv.appendChild(likesDiv);
    
                    let dislikesDiv = document.createElement('div');
                    dislikesDiv.textContent = "Dislikes: " + message.mDislikes;
                    messageDiv.appendChild(dislikesDiv);
    
                    let buttonsFragment = this.buttons(message.messageId);
                    messageDiv.appendChild(buttonsFragment);
    
                    document.getElementById("messageList")?.appendChild(messageDiv);
                });
    
                this.addEventListeners();
            } else {
                console.error("Invalid mData format or mData is undefined");
            }
        }
    }    

    private addEventListeners() {
        const all_likbtns = document.getElementsByClassName("likbtn");
        for (let i = 0; i < all_likbtns.length; ++i) {
            all_likbtns[i].addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent the event from bubbling up to the container
                this.clickLike(e);
            });
        }

        
        const all_dislikbtns = document.getElementsByClassName("dislikbtn");
        for (let i = 0; i < all_dislikbtns.length; ++i) {
            all_dislikbtns[i].addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent the event from bubbling up to the container
                this.clickDislike(e);
            });
        }

        const all_editbtns = document.getElementsByClassName("editbtn");
        for (let i = 0; i < all_editbtns.length; ++i) {
            all_editbtns[i].addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent the event from bubbling up to the container
                this.clickEdit(e);
            });
        }
    
        const all_delbtns = document.getElementsByClassName("delbtn");
        for (let i = 0; i < all_delbtns.length; ++i) {
            all_delbtns[i].addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent the event from bubbling up to the container
                this.clickDelete(e);
            });
        }
    
        const all_message_containers = document.getElementsByClassName("message-container");
        for(let i = 0; i < all_message_containers.length; ++i){
            all_message_containers[i].addEventListener("click", (e) => {
                this.clickExpandMessage(e);
            });
        }
    }

    /**
     * buttons() adds a 'delete' button and an 'edit' button to the HTML for each row
     */
    private buttons(id: string): DocumentFragment {
        let fragment = document.createDocumentFragment();

        // Create a container div for buttons
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');

        // Like button
        let likeBtn = document.createElement('button');
        likeBtn.classList.add("likbtn");
        likeBtn.setAttribute('data-value', id);
        likeBtn.innerHTML = '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
        buttonDiv.appendChild(likeBtn);

        // Dislike button
        
        let dislikeBtn = document.createElement('button');
        dislikeBtn.classList.add("dislikbtn");
        dislikeBtn.setAttribute('data-value', id);
        dislikeBtn.innerHTML = '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>';
        buttonDiv.appendChild(dislikeBtn);
        

        // Delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delbtn");
        deleteBtn.setAttribute('data-value', id);
        deleteBtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        buttonDiv.appendChild(deleteBtn);

        // Edit button
        let editBtn = document.createElement('button');
        editBtn.classList.add("editbtn");
        editBtn.setAttribute('data-value', id);
        editBtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
        buttonDiv.appendChild(editBtn);

        fragment.appendChild(buttonDiv);

        return fragment;
    }

} // end class ElementList




// Run some configuration code when the web page loads
document.addEventListener('DOMContentLoaded', () => {
    // set up initial UI state
    (<HTMLElement>document.getElementById("editElement")).style.display = "none";
    (<HTMLElement>document.getElementById("addElement")).style.display = "none";
    (<HTMLElement>document.getElementById("showElements")).style.display = "block";
    (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
    
    // set up the "Add Message" button
    document.getElementById("showFormButton")?.addEventListener("click", (e) => {
        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        (<HTMLElement>document.getElementById("addElement")).style.display = "block";
        (<HTMLElement>document.getElementById("showElements")).style.display = "none";
        (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
    });

    // show message when click message container div
    document.getElementById("message-container")?.addEventListener("click", (e) => {
        (<HTMLElement>document.getElementById("editElement")).style.display = "none";
        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
        (<HTMLElement>document.getElementById("showElements")).style.display = "none";
        (<HTMLElement>document.getElementById("expandMessage")).style.display = "block";
    });

    // show message when click edit button
    document.getElementById("editButton")?.addEventListener("click", (e) => {
        (<HTMLElement>document.getElementById("editElement")).style.display = "block";
        (<HTMLElement>document.getElementById("addElement")).style.display = "none";
        (<HTMLElement>document.getElementById("showElements")).style.display = "none";
        (<HTMLElement>document.getElementById("expandMessage")).style.display = "none";
    });

    // Create the object that controls the "New Entry" form
    newEntryForm = new NewEntryForm();
    // Create the object that controls the "Expand Message" form
    expandMessageForm = new ExpandMessageForm();

    // Create the object that controls the "Edit Entry" form
    editEntryForm = new EditEntryForm();
    // Create the object for the main data list, and populate it with data from the server
    mainList = new ElementList();
    mainList.refresh();
    //window.alert('DOMContentLoaded');
}, false);

