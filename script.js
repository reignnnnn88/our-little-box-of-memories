document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       HELPER FUNCTIONS
    ========================================================= */

    const $ = (id) => document.getElementById(id);

    function openModal(modal) {
        if (!modal) return;

        // Close other normal modals first
        document.querySelectorAll(".modal.show").forEach((modalItem) => {
            if (modalItem !== modal) {
                modalItem.classList.remove("show");
                modalItem.setAttribute("aria-hidden", "true");
            }
        });

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".modal.show")) {
            document.body.style.overflow = "";
        }
    }


    /* =========================================================
       BIG GIFT BOX
    ========================================================= */

    const bigGift = $("bigGift");
    const giftsContainer = $("giftsContainer");
    const instruction = $("instruction");

    if (bigGift) {
        bigGift.addEventListener("click", () => {

            bigGift.classList.add("open");

            if (instruction) {
                instruction.textContent =
                    "A little box filled with pieces of us. 💚";
            }

            if (giftsContainer) {
                setTimeout(() => {
                    giftsContainer.classList.add("show");
                }, 650);
            }
        });
    }


    /* =========================================================
       OUR MEMORIES
    ========================================================= */

    const memoryGift = $("memoryGift");
    const memoryModal = $("memoryModal");
    const closeMemory = $("closeMemory");

    const memorySlideImage = $("memorySlideImage");
    const memorySlideCounter = $("memorySlideCounter");
    const memorySlideTitle = $("memorySlideTitle");
    const memorySlideDescription = $("memorySlideDescription");

    const previousMemory = $("previousMemory");
    const nextMemory = $("nextMemory");
    const toggleMemorySlideshow = $("toggleMemorySlideshow");
    const memoryProgressBar = $("memoryProgressBar");

    const totalMemories = 65;

    let currentMemory = 1;
    let memorySlideshowPlaying = false;
    let memorySlideshowTimer = null;

    const memoryDetails = [
        ["Always Here 💚", "Kahit anong mangyari, nandito lang ako lagi sa tabi mo."],
        ["Your Support 🥹", "I’ll always support you, kahit sa mga araw na feeling mo hindi mo kaya."],
        ["Your Cheerleader 📣", "I’ll always be here cheering for you, sa bawat small or big win mo."],
        ["Through the Ups ✨", "Sa mga araw na everything feels right, I’ll be here celebrating with you."],
        ["Through the Downs 🌿", "At kapag hindi okay ang lahat, I’ll stay beside you hanggang maging okay ulit."],
        ["Even Zero Days 🥺", "Kahit zero energy, zero motivation, or zero progress today, okay lang. Nandito ako."],
        ["Rest When Needed 🤍", "Pahinga ka kapag pagod ka. Hindi mo kailangang maging strong every single day."],
        ["I Believe in You 💚", "Kahit minsan hindi mo makita yung strength mo, I’ll always believe in you."],
        ["One Step at a Time 🌷", "Hindi kailangang bilisan. One step at a time, sasamahan kita."],
        ["Your Little Wins ❤️", "Kahit maliit na achievement lang, I’ll still be proud of you."],
        ["I'm Proud of You 🥹", "Nakikita ko yung effort mo, kahit feeling mo minsan walang nakakapansin."],
        ["Don't Give Up 💚", "Kapag gusto mo nang sumuko, rest if you need to, but please keep going."],
        ["You Can Lean on Me 🌿", "Hindi mo kailangang dalhin lahat mag-isa. You can always lean on me."],
        ["You Matter 🥺", "Please remember na you matter to me, even on your hardest days."],
        ["No Need to Be Perfect 🤍", "Hindi ko kailangan ng perfect version mo. I just want you as you are."],
        ["I’ll Listen 💚", "Kahit wala akong solution, I’ll listen. Hindi mo kailangang harapin lahat mag-isa."],
        ["When You Feel Lost 🌷", "Kapag hindi mo alam ang next step, nandito ako habang hinahanap mo ulit ang way mo."],
        ["Keep Going ❤️", "Kaya mo 'yan, babyyy. Slowly is still progress, and I’ll be here."],
        ["Your Dreams ✨", "I’ll always support the dreams you're working so hard for."],
        ["I See Your Effort 🥹", "Nakikita ko lahat ng effort mo, kahit hindi mo laging napapansin."],
        ["Don't Compare 💚", "Hindi mo kailangang ikumpara ang journey mo sa iba. Your own pace is okay."],
        ["I’m Your Team 📣", "Whatever happens, remember na I'm always on your side."],
        ["When You're Tired 🌿", "Kapag pagod ka na, pahinga ka. I’ll still be here when you're ready again."],
        ["On Your Bad Days 🥺", "Even on your worst days, you are still loved, supported, and never alone."],
        ["On Your Good Days ❤️", "Kapag masaya ka, masaya rin ako. I love seeing you happy."],
        ["Together 💚", "Hindi kailangang perfect ang journey natin. Basta sabay nating haharapin."],
        ["Stay With Me 🥹", "Sana kahit anong mangyari, piliin pa rin nating manatili sa tabi ng isa't isa."],
        ["I Choose You 🌷", "Sa bawat araw na lilipas, ikaw pa rin ang pipiliin ko."],
        ["Even When I’m Quiet ❤️", "Minsan hindi ko man nasasabi, please know na I’m still here and I still care."],
        ["My Favorite Person 💚", "Sa dami ng taong makikilala natin, I’ll always be grateful that I found you."],
        ["Let's Keep Trying 🥺", "Hindi kailangang perfect tayo. Ang mahalaga, we keep trying for each other."],
        ["Hold My Hand 🌿", "Kapag natatakot ka, hold my hand. We can face it together."],
        ["Your Safe Place ❤️", "Kapag everything feels too much, come to me. You don't always have to be strong."],
        ["Keep Dreaming 💚", "Keep dreaming, love. I’ll be here habang unti-unti mong naaabot ang mga pangarap mo."],
        ["Our Future 🥹", "Hindi ko alam exactly kung ano ang future natin, but I hope we face it together."],
        ["Keep Praying 🙏🏻", "Patuloy lang tayong manalangin at magtiwala kay Lord sa lahat ng bagay."],
        ["God's Plans 💚", "Naniniwala ako na may magandang plano si Lord para sa ating dalawa."],
        ["His Perfect Time 🥹", "Hindi man ngayon, darating din ang mga bagay na hinihintay natin sa perfect time ni Lord."],
        ["Trust His Timing 🙏🏻", "Let's trust God's timing kahit minsan hindi natin naiintindihan kung bakit kailangan maghintay."],
        ["Our Prayers 🌷", "Naniniwala ako na bibigay din sa atin ni Lord ang mga bagay na lagi nating ipinagdarasal."],
        ["Be Patient ❤️", "Hindi natin kailangang madaliin lahat. Let's wait and trust His plans for us."],
        ["Keep Believing 💚", "Kahit matagal, let's keep believing na may dahilan ang bawat paghihintay natin."],
        ["Someday 🥹", "One day, makikita rin natin kung bakit kailangan nating pagdaanan ang lahat ng ito."],
        ["God Knows Best 🙏🏻", "Hindi man natin alam ang possible na mangyayari, let's trust that God knows what's best for us."],
        ["Our Dreams 🌿", "Sabay nating ipagdasal ang mga pangarap natin, then let's leave the timing to God."],
        ["Faith ❤️", "Kapag hindi natin alam ang next step, let's keep our faith and continue moving forward."],
        ["One Day, Love 💚", "Darating din ang araw na masasabi nating, “Worth it pala lahat ng paghihintay.”"],
        ["Together in Faith 🥹", "Habang hinihintay natin ang answers sa prayers natin, sana magkasama pa rin tayo."],
        ["Trust the Journey 🌷", "Hindi man natin alam kung saan tayo dadalhin, let's trust God and walk together."],
        ["Our Little Hope 🙏🏻", "Sana manatili tayong hopeful sa mga bagay na matagal nating ipinagdarasal."],
        ["Keep Holding On ❤️", "Kahit mahirap minsan, let's keep holding on to each other and to our faith."],
        ["God's Timing 💚", "Maybe hindi pa ngayon, but I believe everything will come at the right time."],
        ["Our Tomorrow 🥹", "Whatever tomorrow brings, I hope we continue praying, believing, and choosing each other."],
        ["I’ll Be Beside You 🌿", "Habang hinahabol natin ang dreams natin, I’ll be right here beside you."],
        ["Through Every Season ❤️", "Whatever season life brings us, I hope we keep choosing each other."],
        ["Through Everything 💚", "Hindi lang sa happy moments. I want to be with you through everything."],
        ["Still Us 🥺", "Kahit maraming magbago, sana tayo pa rin—still supporting, still choosing, still loving."],
        ["Choose Me Too 🌷", "Sana sa bawat araw na pipiliin kita, piliin mo rin akong manatili sa tabi mo."],
        ["Always Rooting for You 📣", "Kahit hindi ako laging vocal, I’m always rooting for you from the heart."],
        ["Always Beside You 💚", "Sa bawat pangarap, struggle, achievement, at zero day mo, nandito ako."],
        ["Even When I Don’t Say It 🥹", "Minsan hindi ko naipapakita, pero araw-araw kitang iniisip, sinusuportahan, at pinipili."],
        ["My Promise ❤️", "I’ll keep trying to be someone you can count on through every season of life."],
        ["Every Single Day 🌿", "Araw-araw, kahit ordinary day lang, ikaw pa rin ang pipiliin ko."],
        ["My Little Reminder 💚", "If you ever forget, remember this: nandito lang ako. Always."],
        ["Always You 🥹❤️", "Araw-araw kitang pipiliin, kahit minsan hindi ko naipapakita o nasasabi. Sana ikaw rin—stay beside me, through every up and down, every zero day, every dream, every prayer, and every season. Let’s keep trusting God’s plans and His perfect timing for us. 🙏🏻💚"]
    ];

    function updateMemorySlide() {
        if (!memorySlideImage) return;

        const detail = memoryDetails[currentMemory - 1];

        memorySlideImage.src = `${currentMemory}.jpg`;
        memorySlideImage.alt = `Memory ${currentMemory}`;

        if (memorySlideCounter) {
            memorySlideCounter.textContent =
                `${currentMemory} / ${totalMemories}`;
        }

        if (detail) {
            if (memorySlideTitle) {
                memorySlideTitle.textContent = detail[0];
            }

            if (memorySlideDescription) {
                memorySlideDescription.textContent = detail[1];
            }
        }

        if (memoryProgressBar) {
            memoryProgressBar.style.width =
                `${(currentMemory / totalMemories) * 100}%`;
        }
    }

    function stopMemorySlideshow() {
        if (memorySlideshowTimer) {
            clearInterval(memorySlideshowTimer);
            memorySlideshowTimer = null;
        }

        memorySlideshowPlaying = false;

        if (toggleMemorySlideshow) {
            toggleMemorySlideshow.textContent = "▶";
        }
    }

    function startMemorySlideshow() {
        if (!memorySlideImage) return;

        if (memorySlideshowTimer) {
            clearInterval(memorySlideshowTimer);
        }

        memorySlideshowPlaying = true;

        if (toggleMemorySlideshow) {
            toggleMemorySlideshow.textContent = "⏸";
        }

        memorySlideshowTimer = setInterval(() => {
            currentMemory++;

            if (currentMemory > totalMemories) {
                currentMemory = 1;
            }

            updateMemorySlide();
        }, 5000);
    }

    function resetMemorySlideshow() {
        currentMemory = 1;
        updateMemorySlide();
        startMemorySlideshow();
    }

    if (memoryGift) {
        memoryGift.addEventListener("click", () => {
            openModal(memoryModal);
            resetMemorySlideshow();
        });
    }

    if (closeMemory) {
        closeMemory.addEventListener("click", () => {
            stopMemorySlideshow();
            closeModal(memoryModal);
        });
    }

    if (previousMemory) {
        previousMemory.addEventListener("click", () => {
            currentMemory--;

            if (currentMemory < 1) {
                currentMemory = totalMemories;
            }

            updateMemorySlide();

            if (memorySlideshowPlaying) {
                startMemorySlideshow();
            }
        });
    }

    if (nextMemory) {
        nextMemory.addEventListener("click", () => {
            currentMemory++;

            if (currentMemory > totalMemories) {
                currentMemory = 1;
            }

            updateMemorySlide();

            if (memorySlideshowPlaying) {
                startMemorySlideshow();
            }
        });
    }

    if (toggleMemorySlideshow) {
        toggleMemorySlideshow.addEventListener("click", () => {
            if (memorySlideshowPlaying) {
                stopMemorySlideshow();
            } else {
                startMemorySlideshow();
            }
        });
    }


    /* =========================================================
       THINGS I LOVE ABOUT YOU
    ========================================================= */

    const loveGift = $("loveGift");
    const loveModal = $("loveModal");
    const closeLove = $("closeLove");

    if (loveGift) {
        loveGift.addEventListener("click", () => {
            openModal(loveModal);
        });
    }

    if (closeLove) {
        closeLove.addEventListener("click", () => {
            closeModal(loveModal);
        });
    }


    /* =========================================================
       OUR SONG
    ========================================================= */

    const songGift = $("songGift");
    const songModal = $("songModal");
    const closeSong = $("closeSong");

    const ourSong = $("ourSong");
    const playSong = $("playSong");
    const songProgress = $("songProgress");

    const currentTime = $("currentTime");
    const duration = $("duration");
    const nowPlaying = $("nowPlaying");
    const songMessage = $("songMessage");

    const songMessages = [
        "A little song for a little piece of us. 💚",
        "I hope this song always reminds you of me. 🥺❤️",
        "Five months, countless little moments, and so many memories. ✨",
        "If I could freeze one feeling, it would be this feeling with you. 💚",
        "No matter where we are, a little part of my heart is always with you. 🌷",
        "Thank you for being one of my favorite parts of every day. 🥹",
        "Here's to more songs, more memories, and more months together. ❤️",
        "I love you, my love. Happy 5th monthsary. 💚"
    ];

    let songMessageIndex = 0;
    let songMessageTimer = null;

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) {
            return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function stopSongMessages() {
        if (songMessageTimer) {
            clearInterval(songMessageTimer);
            songMessageTimer = null;
        }
    }

    function startSongMessages() {
        stopSongMessages();

        songMessageTimer = setInterval(() => {
            songMessageIndex =
                (songMessageIndex + 1) % songMessages.length;

            if (songMessage) {
                songMessage.textContent =
                    songMessages[songMessageIndex];
            }
        }, 5000);
    }

    function resetSong() {
        stopSongMessages();

        songMessageIndex = 0;

        if (ourSong) {
            ourSong.pause();
            ourSong.currentTime = 0;
        }

        if (songMessage) {
            songMessage.textContent = songMessages[0];
        }

        if (playSong) {
            playSong.textContent = "▶";
        }

        if (currentTime) {
            currentTime.textContent = "0:00";
        }

        if (duration) {
            duration.textContent = "0:00";
        }

        if (songProgress) {
            songProgress.value = 0;
        }

        if (nowPlaying) {
            nowPlaying.textContent =
                "Press play when you're ready. 💚";
        }
    }

    if (songGift) {
        songGift.addEventListener("click", () => {
            openModal(songModal);
            resetSong();
        });
    }

    if (playSong && ourSong) {
        playSong.addEventListener("click", async () => {
            if (ourSong.paused) {
                try {
                    await ourSong.play();

                    playSong.textContent = "⏸";

                    if (nowPlaying) {
                        nowPlaying.textContent =
                            "Now playing: PANAGINIP 💚";
                    }

                    startSongMessages();

                } catch (error) {
                    console.error("Audio error:", error);

                    if (nowPlaying) {
                        nowPlaying.textContent =
                            "Unable to play panaginip.mp3. 💚";
                    }
                }

            } else {
                ourSong.pause();

                playSong.textContent = "▶";

                if (nowPlaying) {
                    nowPlaying.textContent =
                        "Music paused. 💚";
                }

                stopSongMessages();
            }
        });
    }

    if (ourSong) {
        ourSong.addEventListener("loadedmetadata", () => {
            if (duration) {
                duration.textContent =
                    formatTime(ourSong.duration);
            }

            if (songProgress) {
                songProgress.max =
                    ourSong.duration || 0;
            }
        });

        ourSong.addEventListener("timeupdate", () => {
            if (currentTime) {
                currentTime.textContent =
                    formatTime(ourSong.currentTime);
            }

            if (songProgress) {
                songProgress.value =
                    ourSong.currentTime;
            }
        });

        ourSong.addEventListener("ended", () => {
            resetSong();
        });
    }

    if (songProgress && ourSong) {
        songProgress.addEventListener("input", () => {
            ourSong.currentTime =
                Number(songProgress.value);
        });
    }

    if (closeSong) {
        closeSong.addEventListener("click", () => {
            resetSong();
            closeModal(songModal);
        });
    }


    /* =========================================================
       OPEN WHEN
    ========================================================= */

    const openWhenGift = $("openWhenGift");
    const openWhenModal = $("openWhenModal");
    const closeOpenWhen = $("closeOpenWhen");

    if (openWhenGift) {
        openWhenGift.addEventListener("click", () => {
            openModal(openWhenModal);
        });
    }

    if (closeOpenWhen) {
        closeOpenWhen.addEventListener("click", () => {
            closeModal(openWhenModal);
        });
    }


    /* =========================================================
       INDIVIDUAL OPEN-WHEN LETTERS
    ========================================================= */

    const individualLetterModal =
        $("individualLetterModal");

    const closeIndividualLetter =
        $("closeIndividualLetter");

    const individualLetterTitle =
        $("individualLetterTitle");

    const individualLetterIcon =
        $("individualLetterIcon");

    const individualLetterText =
        $("individualLetterText");

    const letters = {
        miss: {
            title: "Open when you miss me 💗",
            icon: "💗",
            text: `If you're reading this because you miss me, I hope you know that I probably miss you too.

Even when we're not together, you're still somewhere in my thoughts. Sometimes it's because I remember something funny you said, sometimes because I see something that reminds me of you, and sometimes I simply just think about you.

I hope you remember that distance or a busy day doesn't change how much you mean to me.

So whenever you miss me, imagine me giving you the biggest hug.

I love you, always. 💗`
        },

        sad: {
            title: "Open when you're sad 🌷",
            icon: "🌷",
            text: `Hey, Babyyyy.

If today feels heavy, please remember that you don't have to be okay every single moment.

It's okay to rest. It's okay to feel tired. It's okay to have a bad day.

Please be gentle with yourself.

I may not always be physically beside you, but I hope you can feel that I'm cheering for you and believing in you.

Whatever you're going through, you don't have to face it alone.

Take a deep breath, my love.

Tomorrow can be a little better. 🌷`
        },

        smile: {
            title: "Open when you need a smile ✨",
            icon: "✨",
            text: `Hi, babyyy. 🥺

This is your reminder to smile.

Yes, you.

Even just a tiny one.

Remember all our random moments, our silly conversations, the jokes that made no sense, and all the little things that made us laugh.

I hope one of those memories makes you smile right now.

And if it doesn't work...

Then just remember that somewhere, there's a girl who loves calling you her favorite person. 💚

Now smile for me. ✨`
        },

        remember: {
            title: "Open when you want to remember us 🌙",
            icon: "🌙",
            text: `Remember us.

Remember how everything started.

Remember the little conversations that slowly became something more.

Remember the moments when we laughed until our cheeks hurt.

Remember the quiet moments too.

Remember the times we chose to stay, understand, and keep going.

Five months is only one chapter.

There are still so many pages left for us to write.

And I hope we keep filling those pages with memories worth remembering. 🌙💚`
        },

        love: {
            title: "Open when you need to know I love you ❤️",
            icon: "❤️",
            text: `I love you.

I know those three words can sometimes become ordinary when we hear them often, so let me remind you what I mean when I say them.

I love you on the easy days.

I love you on the difficult days.

I love you when we're laughing.

I love you when we're quiet.

I love you when everything feels perfect and even when things don't.

You are important to me.

You are loved.

And you will always have a special place in my heart.

Happy 5th monthsary, my love. ❤️`
        }
    };

    document.querySelectorAll(".letter-envelope").forEach((button) => {

        button.addEventListener("click", () => {

            const key = button.dataset.letter;
            const letter = letters[key];

            if (!letter) return;

            if (individualLetterTitle) {
                individualLetterTitle.textContent =
                    letter.title;
            }

            if (individualLetterIcon) {
                individualLetterIcon.textContent =
                    letter.icon;
            }

            if (individualLetterText) {
                individualLetterText.textContent =
                    letter.text;
            }

            openModal(individualLetterModal);
        });
    });

    if (closeIndividualLetter) {
        closeIndividualLetter.addEventListener("click", () => {
            closeModal(individualLetterModal);
        });
    }


    /* =========================================================
       MY LETTER
    ========================================================= */

    const letterGift = $("letterGift");
    const letterModal = $("letterModal");
    const closeLetter = $("closeLetter");

    if (letterGift) {
        letterGift.addEventListener("click", () => {
            openModal(letterModal);
        });
    }

    if (closeLetter) {
        closeLetter.addEventListener("click", () => {
            closeModal(letterModal);
        });
    }


    /* =========================================================
       MEMORY LIGHTBOX
    ========================================================= */

    const memoryLightbox =
        $("memoryLightbox");

    const memoryLightboxImage =
        $("memoryLightboxImage");

    const closeMemoryLightbox =
        $("closeMemoryLightbox");

    function closeLightbox() {
        if (!memoryLightbox) return;

        memoryLightbox.classList.remove("show");
        memoryLightbox.setAttribute("aria-hidden", "true");

        if (!document.querySelector(".modal.show")) {
            document.body.style.overflow = "";
        }
    }

    document.querySelectorAll(".memory-gallery img").forEach((image) => {

        image.addEventListener("click", () => {

            if (!memoryLightbox || !memoryLightboxImage) {
                return;
            }

            memoryLightboxImage.src = image.src;
            memoryLightboxImage.alt =
                image.alt || "Memory photo";

            memoryLightbox.classList.add("show");
            memoryLightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
        });
    });

    if (closeMemoryLightbox) {
        closeMemoryLightbox.addEventListener(
            "click",
            closeLightbox
        );
    }

    if (memoryLightbox) {
        memoryLightbox.addEventListener("click", (event) => {

            if (event.target === memoryLightbox) {
                closeLightbox();
            }

        });
    }


    /* =========================================================
       CLOSE MODALS BY CLICKING BACKDROP
    ========================================================= */

    document.querySelectorAll(".modal").forEach((modal) => {

        modal.addEventListener("click", (event) => {

            if (event.target !== modal) {
                return;
            }

            if (modal === memoryModal) {
                stopMemorySlideshow();
            }

            if (modal === songModal) {
                resetSong();
            }

            closeModal(modal);
        });

    });


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        document.querySelectorAll(".modal.show").forEach((modal) => {

            if (modal === memoryModal) {
                stopMemorySlideshow();
            }

            if (modal === songModal) {
                resetSong();
            }

            closeModal(modal);
        });

        if (
            memoryLightbox &&
            memoryLightbox.classList.contains("show")
        ) {
            closeLightbox();
        }
    });

        // ==========================================
    // BACKUP FIX — BOXES 3, 4, AND 5
    // ==========================================

    const box3 = document.getElementById("songGift");
    const box4 = document.getElementById("openWhenGift");
    const box5 = document.getElementById("letterGift");

    const modal3 = document.getElementById("songModal");
    const modal4 = document.getElementById("openWhenModal");
    const modal5 = document.getElementById("letterModal");


    // BOX 3 — OUR SONG
    if (box3 && modal3) {
        box3.onclick = function () {
            modal3.classList.add("show");
            modal3.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        };
    }


    // BOX 4 — OPEN WHEN
    if (box4 && modal4) {
        box4.onclick = function () {
            modal4.classList.add("show");
            modal4.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        };
    }


    // BOX 5 — MY LETTER
    if (box5 && modal5) {
        box5.onclick = function () {
            modal5.classList.add("show");
            modal5.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        };
    }

    // =========================================
// CUTE LOADING SCREEN
// =========================================

setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");

    if (loadingScreen) {
        loadingScreen.classList.add("hidden");

        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }
}, 2200);


    /* =========================================================
       INITIALIZE
    ========================================================= */

    updateMemorySlide();

});