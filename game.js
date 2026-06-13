    const configurations = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,

        physics: {
            default: "arcade",
            arcade: {
                gravity: { y : 0 },
                debug: false  // This is to allow us to see hitboxes and stuff liddat 
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    const newgame = new Phaser.Game(configurations);

    function preload() {
        // loading controllable character
        this.load.spritesheet('characters', 'assets/Images/sprite sheet.png', { frameWidth: 16, frameHeight: 20 });
        // loading chest
        this.load.image('memory', 'assets/Images/memory.png'); 
        // loading memory photos
        this.load.image('after_work-photo', 'assets/Images/after_work.jpg');  
        // loading grass tile
        this.load.image('grass', 'assets/Images/grass_tile.png');

        // all the rest of the images 
        this.load.image('burrito-photo', 'assets/Images/burrito.jpg');

        this.load.image('first_meet_after_uk-photo', 'assets/Images/first_meet_after_uk.jpg');

        this.load.image('first_time-photo', 'assets/Images/first_time.jpg');

        this.load.image('halloweeny-photo', 'assets/Images/halloweeny.jpg');

        this.load.image('kissy_in_edin-photo', 'assets/Images/kissy_in_edin.jpg');

        this.load.image('locked_in-photo', 'assets/Images/locked_in.jpeg');

        this.load.image('lying_down-photo', 'assets/Images/lying_down.jpg');

        this.load.image('memory-photo', 'assets/Images/memory.png');

        this.load.image('politician_couple-photo', 'assets/Images/politician_couple.jpg');

        this.load.image('proud_dancer-photo', 'assets/Images/proud_dancer.jpg');

    }

    function create() {
        
        // Creation of grass background at x:800, y:600
        this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0,0);
        // Player creation
        this.player = this.physics.add.sprite(400, 300, 'characters', 0);
        // Ensures cannot leave the boundary
        this.player.setCollideWorldBounds(true);
        // Enlarge becauase the character we cut out from the sprite sheet is small
        this.player.setScale(2.5);
        
        // Movement scripting using WASD keys 
        this.keys = {
            w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        }

        // Instruction
        this.add.text(400, 550, 'Use WASD to move around and collect all memories!', { fontSize: '18px', fill: '#ffffff', stroke: '#000000', strokeThickness: 3, align: 'center' }).setOrigin(0.5);

        

        // Interactive control key 
        this.interactKey = this.input.keyboard.addKey('E');

        // Collected memories
        this.memoriesFound = [];

        // Memory counter 
        this.memoryText = this.add.text(16, 16, 'Memories Collected: 0/10', { fontSize: '24px', fill: '#fff', stroke: '#000', strokeThickness: 4 });
        this.memoryText.setScrollFactor(0);

        // Indicate when user is near interactable object -- chest
        this.promptText = this.add.text(400, 500, '', { fontSize: '18px', fill: '#000000', stroke: '#ffffff', strokeThickness: 3, align: 'center' });
        this.promptText.setOrigin(0.5);
        this.promptText.setScrollFactor(0);

        // Disallow movement during pop up
        this.popupOpen = false;

        console.log('Game created! Use WASD to move the character, press E near a Chest to open it!');

        // Adding the chest into posiiton X: 600, Y:200
        this.memory = this.physics.add.sprite(600, 200, 'memory');
        this.memory.setScale(1.5);
        this.memory.memoryId = 'after_work';
        // memory is our chest, don't confuse this with the rest of the memories 
        // This makes our chest pulse using Phaser's tween
        this.tweens.add({ 
            targets: this.memory,
            scaleX:2.2,
            scaleY:2.2,
            duration: 1000,
            yoyo: true, // After animation done, reverse back to the start
            repeat: -1, // Repeat forever
            ease: 'Sine.easeInOut' // Controls how the animation moves
        })

        this.memory2 = this.physics.add.sprite(100, 530, 'memory')
        this.memory2.setScale(1.5);
        this.memory2.memoryId = 'burrito';
        this.tweens.add({targets: this.memory2, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory3 = this.physics.add.sprite(200, 429, 'memory')
        this.memory3.setScale(1);
        this.memory3.memoryId = 'first_meet_after_uk';
        this.tweens.add({targets: this.memory3, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory4 = this.physics.add.sprite(600, 300, 'memory')
        this.memory4.setScale(1.5); 
        this.memory4.memoryId = 'first_time';
        this.tweens.add({targets: this.memory4, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})


        this.memory5 = this.physics.add.sprite(300, 200, 'memory')
        this.memory5.setScale(1.5); 
        this.memory5.memoryId = 'halloweeny';
        this.tweens.add({targets: this.memory5, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory6 = this.physics.add.sprite(300, 300, 'memory')
        this.memory6.setScale(1.5); 
        this.memory6.memoryId = 'kissy_in_edin';
        this.tweens.add({targets: this.memory6, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory7 = this.physics.add.sprite(100, 50, 'memory')
        this.memory7.setScale(1); 
        this.memory7.memoryId = 'locked_in';
        this.tweens.add({targets: this.memory7, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory8 = this.physics.add.sprite(20, 50, 'memory')
        this.memory8.setScale(1.5); 
        this.memory8.memoryId = 'lying_down';
        this.tweens.add({targets: this.memory8, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory9 = this.physics.add.sprite(200, 200, 'memory')
        this.memory9.setScale(1.5); 
        this.memory9.memoryId = 'politician_couple';
        this.tweens.add({targets: this.memory9, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

        this.memory10 = this.physics.add.sprite(500, 300, 'memory')
        this.memory10.setScale(1.5); 
        this.memory10.memoryId = 'proud_dancer'; this.tweens.add({targets: this.memory10, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})
        this.tweens.add({targets: this.memory10, scaleX:2.2, scaleY:2.2, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'})

    }


    function update() {
        // If the popup is open, we want the character to not move
        if (this.popupOpen) {
            this.player.body.setVelocity(0);
            return; // So that is this.popupOpen is true, we skip the rest of update code, which is essentially moving
        }

        // Resetting the velocity before anything begins
        this.player.body.setVelocity(0);

        if (this.keys.w.isDown) {
            this.player.y -= 3;
        }
        if (this.keys.s.isDown) {
            this.player.y += 3;
        }
        if (this.keys.a.isDown) {
            this.player.x -= 3;
        }
        if (this.keys.d.isDown) {
            this.player.x += 3;
        }
        
        let MemoryArray = [this.memory, this.memory2, this.memory3, this.memory4, this.memory5, this.memory6, this.memory7, this.memory8, this.memory9, this.memory10];


        let nearChest = false;

        for (let memory of MemoryArray) {
            if (memory && memory.active) {
                let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, memory.x, memory.y);

                if (distance < 50) {
                    nearChest = true;
                    this.promptText.setText('Press E to open the chest!');
                    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
                        collectMemory.call(this, memory);
                        break;
                }
            }
        }
        
        if (!nearChest) {
            this.promptText.setText('');
        }
        }



    function collectMemory(memoryObject) {
        const memoryId = memoryObject.memoryId;

        if(this.memoriesFound.includes(memoryId)) {
            return; 
        }
        // Place the memories in the COllected memoryu array 
        this.memoriesFound.push(memoryId);

        // Remove chest from game world
        memoryObject.destroy(); 

        // Update memory counter
        this.memoryText.setText(`Memories: ${this.memoriesFound.length}/10`);
        
        // show the photo 
        showMemoryPopup.call(this, memoryId);

        // Check if all 10 memories are collected
        if (this.memoriesFound.length === 10) {
            setTimeout(() => {
                alert('LOVE U bb bear :D');
                // window.location.href = 'fill http of yt later'; FILL IN LATER
            }, 500);
        }
    }
    }

    function showMemoryPopup(memoryId) {
        this.popupOpen = true; // This will stop the player from moving

        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
        overlay.setScrollFactor(0);
        overlay.setDepth(100);

        const photo = this.add.image(400, 280, memoryId + '-photo');
        // Make sure its in front of the overlay
        photo.setDepth(101); 
        photo.setScrollFactor(0);



        const maxWidth = 600; 
        const maxHeight = 400;
        if (photo.width > maxWidth || photo.height > maxHeight) {
            const scale = Math.min(maxWidth / photo.width, maxHeight / photo.height);
            photo.setScale(scale);
        }

        const captionArray = {
            'after_work': 'After work that day :P So glad to see u',
            'burrito': ' Spicy spicy burritoe!',
            'first_meet_after_uk': 'Miao happy happy memory',
            first_time: ' 18 jin',
            halloweeny: ' Hee hee actually had so much fun dressing up with you bb bear!',
            kissy_in_edin: 'SPICY!!! this was lowkey magical for me everytime I look at it',
            locked_in: 'RAHHH STUDY INSTEAD OF LYING TGT AND ROTTING sed but happy ',
            lying_down: 'FRIMORY! (Friend Memory)',
            politician_couple: 'u r the minister to my heart aiyo',
            proud_dancer: 'will always support u bb'
         };

        const captionText = captionArray[memoryId] || 'Memory Unlocked!';

        const caption = this.add.text(400, 520, captionText, {fontSize: '20px', fill: '#fff', align: 'center', fontStyle: 'bold'});
        caption.setOrigin(0.5);
        caption.setDepth(101);
        caption.setScrollFactor(0);

        const instruction = this.add.text(400, 560, 'Press E to close', {fontSize: '16px', fill: '#aaaaaa', align: 'center'});
        instruction.setOrigin(0.5);
        instruction.setDepth(101);
        instruction.setScrollFactor(0);

        const closePopup = () => {
            overlay.destroy();
            photo.destroy();
            caption.destroy();
            instruction.destroy();
            this.popupOpen = false; // Allow movement again
            this.input.keyboard.off('keydown-E', closePopup);
        };

        this.input.keyboard.on('keydown-E', closePopup);
    }

    