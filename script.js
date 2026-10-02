/* =========================================
   GET HTML ELEMENTS
========================================= */

const card = document.getElementById("card");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const mainEmoji = document.getElementById("mainEmoji");
const successMessage = document.getElementById("successMessage");


/* =========================================
   NO BUTTON MESSAGES
   These repeat forever
========================================= */

const noMessages = [
    "Hehe, too slow 😅",
    "Nope! 💕",
    "Catch me! 🏃‍♂️💨",
    "Are you sure? 🥹",
    "Try again! 😂",
    "I'm shy! 🙈",
    "Almost! 💗",
    "You can't catch me! 😜",
    "Maybe choose Yes? 💘",
    "Still no! 😆",
    "I'm over here! 👀",
    "Nice try! 💕"
];


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", function () {

    /*
        Stop the No button from being
        interacted with after Yes.
    */

    noButton.style.display = "none";


    /*
        Change the card state.
    */

    card.classList.add("accepted");


    /*
        Change the emoji.
    */

    mainEmoji.textContent = "😍";


    /*
        Success message.
    */

    successMessage.innerHTML =
        "YAY! 💖 Thank you so much<3" +
        "<br>" +
        "I can't wait to spend it XD. ✨";


    /*
        Celebration animation.
    */

    yesButton.style.animation =
        "buttonCelebrate 0.7s ease";


    /*
        Create lots of hearts.
    */

    createHearts(30);

});


/* =========================================
   NO BUTTON EVENTS
========================================= */

/*
    When the mouse gets close to the
    No button, immediately move it.
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
    Mobile/tablet support.
*/

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/*
    If somehow they actually click it,
    move it again.
*/

noButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


/* =========================================
   MOVE NO BUTTON
   INFINITE — NO LIMIT
========================================= */

function moveNoButton() {

    /*
        Make sure the button is fixed
        to the browser window.
    */

    noButton.style.position = "fixed";

    noButton.style.zIndex = "9999";


    /*
        Get the current button size.
    */

    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    /*
        Keep some space from the
        edges of the screen.
    */

    const padding = 20;


    /*
        Calculate the maximum safe
        X and Y positions.
    */

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;


    /*
        Generate a completely random
        position EVERY SINGLE TIME.

        There is NO counter.
        There is NO maximum number
        of attempts.
    */

    const randomX =
        Math.floor(
            Math.random() *
            Math.max(
                1,
                maxX - padding
            )
        ) + padding;


    const randomY =
        Math.floor(
            Math.random() *
            Math.max(
                1,
                maxY - padding
            )
        ) + padding;


    /*
        Move the button.
    */

    noButton.style.left =
        randomX + "px";

    noButton.style.top =
        randomY + "px";


    /*
        Pick a message.

        The modulo (%) makes the
        messages repeat forever.

        Example:

        1 → message 1
        2 → message 2
        ...
        12 → message 12
        13 → message 1
        14 → message 2

        So there is NO LIMIT.
    */

    const randomMessage =
        Math.floor(
            Math.random() *
            noMessages.length
        );

    noButton.textContent =
        noMessages[randomMessage];


    /*
        Give the button a little
        random rotation.
    */

    const randomRotation =
        Math.floor(
            Math.random() * 16
        ) - 8;

    noButton.style.transform =
        `rotate(${randomRotation}deg)`;
}


/* =========================================
   KEEP BUTTON INSIDE SCREEN
========================================= */

window.addEventListener(
    "resize",
    function () {

        /*
            If the No button is currently
            on the screen, make sure it
            doesn't get pushed outside
            after resizing.
        */

        if (
            noButton.style.display === "none"
        ) {
            return;
        }


        const rect =
            noButton.getBoundingClientRect();


        const padding = 20;


        const maxX =
            window.innerWidth -
            rect.width -
            padding;


        const maxY =
            window.innerHeight -
            rect.height -
            padding;


        let currentX =
            parseFloat(
                noButton.style.left
            );


        let currentY =
            parseFloat(
                noButton.style.top
            );


        /*
            If position isn't a number,
            put it somewhere safe.
        */

        if (isNaN(currentX)) {
            currentX = 20;
        }


        if (isNaN(currentY)) {
            currentY = 20;
        }


        /*
            Clamp X.
        */

        currentX =
            Math.max(
                padding,
                Math.min(
                    currentX,
                    maxX
                )
            );


        /*
            Clamp Y.
        */

        currentY =
            Math.max(
                padding,
                Math.min(
                    currentY,
                    maxY
                )
            );


        /*
            Apply corrected position.
        */

        noButton.style.left =
            currentX + "px";

        noButton.style.top =
            currentY + "px";

    }
);


/* =========================================
   CREATE HEARTS
========================================= */

function createHearts(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement("div");


        /*
            Random heart emoji.
        */

        const hearts = [
            "💖",
            "💕",
            "💗",
            "💘",
            "💓"
        ];


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        /*
            Starting position.
        */

        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";


        /*
            Random size.
        */

        heart.style.fontSize =
            (
                18 +
                Math.random() * 25
            ) +
            "px";


        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "10000";


        /*
            Add to document.
        */

        document.body.appendChild(
            heart
        );


        /*
            Random movement.
        */

        const moveX =
            (
                Math.random() -
                0.5
            ) * 600;


        const moveY =
            -(
                200 +
                Math.random() * 450
            );


        /*
            Animate heart.
        */

        const animation =
            heart.animate(

                [

                    {
                        transform:
                            "translate(-50%, -50%) scale(0.4)",

                        opacity: 0
                    },

                    {

                        transform:
                            "translate(-50%, -50%) scale(1.2)",

                        opacity: 1,

                        offset: 0.15
                    },

                    {

                        transform:
                            `translate(
                                calc(-50% + ${moveX}px),
                                calc(-50% + ${moveY}px)
                            )
                            scale(0.8)`,

                        opacity: 0
                    }

                ],

                {

                    duration:
                        1400 +
                        Math.random() * 1000,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)",

                    fill:
                        "forwards"
                }

            );


        /*
            Remove heart after animation.
        */

        animation.onfinish =
            function () {

                heart.remove();

            };

    }
}