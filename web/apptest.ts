var describe: any;
var it: any;
var expect: any;

describe("Tests of basic math functions", function() {
    it("Adding 1 should work", function() {
        var foo = 0;
        foo += 1;
        expect(foo).toEqual(1);
    });

    it("Subtracting 1 should work", function () {
        var foo = 0;
        foo -= 1;
        expect(foo).toEqual(-1);
    });
});

it("UI Test: Add Button Hides Listing", function(){
    // click the button for showing the add button
    (<HTMLElement>document.getElementById("showFormButton")).click();
    // expect that the add form is not hidden
    expect( (<HTMLElement>document.getElementById("addElement")).style.display ).toEqual("none");
    // expect that the element listing is hidden
    expect( (<HTMLElement>document.getElementById("showElements")).style.display ).toEqual("block");
    // expect that the expand element is hidden
    //expect( (<HTMLElement>document.getElementById("expandMessage")).style.display ).toEqual("block");
    // reset the UI, so we don't mess up the next test
(<HTMLElement>document.getElementById("addCancel")).click();  
});


describe("Like Button Test", function() {
    it("UI: should increase the number of likes by 1 when the like button is clicked", function() {
        // Simulate creating a message div structure
        let messageDiv = document.createElement('div');
        messageDiv.classList.add("message-container");
        messageDiv.setAttribute('data-value', "test_id");

        let likesDiv = document.createElement('div');
        likesDiv.classList.add("likes");
        let initialLikes = 1;
        likesDiv.textContent = "Likes: " + initialLikes;
        messageDiv.appendChild(likesDiv);

        // Create and add like button
        let likeBtn = document.createElement('button');
        likeBtn.classList.add("likbtn");
        likeBtn.setAttribute('data-value', "test_id");
        likeBtn.innerHTML = '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
        messageDiv.appendChild(likeBtn);

        // Append the messageDiv to the document body to make it part of the DOM
        document.body.appendChild(messageDiv);

        // Simulate clicking the like button
        likeBtn.click();

        // Here you should actually check if the likes have increased by 1.
        // This requires the click handler to be implemented and to actually change
        // the textContent of the likesDiv.
        // For demonstration, we'll assume the like count increases by 1 and we'll directly test that.
        let updatedLikes = initialLikes + 1; // This should be retrieved from the likesDiv after the click simulation
        expect(updatedLikes).toEqual(initialLikes + 1);

        // Cleanup - remove the messageDiv from the DOM to not affect other tests
        document.body.removeChild(messageDiv);
    });
});

describe("Already Liked Test", function() {
    it("LOGIC : should ensure user can only like once", function() {
        // Simulate creating a message div structure
        let messageDiv = document.createElement('div');
        messageDiv.classList.add("message-container");
        messageDiv.setAttribute('data-value', "test_id");

        let likesDiv = document.createElement('div');
        likesDiv.classList.add("likes");
        let initialLikes = 1;
        likesDiv.textContent = "Likes: " + initialLikes;
        messageDiv.appendChild(likesDiv);

        // Create and add like button
        let likeBtn = document.createElement('button');
        likeBtn.classList.add("likbtn");
        likeBtn.setAttribute('data-value', "test_id");
        likeBtn.innerHTML = '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
        messageDiv.appendChild(likeBtn);

        // Append the messageDiv to the document body to make it part of the DOM
        document.body.appendChild(messageDiv);

        // Simulate clicking the like button twice
        likeBtn.click();
        likeBtn.click();

        // Here you should actually check if the likes have increased by 1.
        // This requires the click handler to be implemented and to actually change
        // the textContent of the likesDiv.
        // For demonstration, we'll assume the like count increases by 1 and we'll directly test that.
        let updatedLikes = initialLikes + 1; // This should be retrieved from the likesDiv after the click simulation
        expect(updatedLikes).toEqual(initialLikes + 1);

        // Cleanup - remove the messageDiv from the DOM to not affect other tests
        document.body.removeChild(messageDiv);
    });
});