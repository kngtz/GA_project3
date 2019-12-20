const questions = [
  {
    text: "Why can't I sleep at night?",
    pick: 1
  },
  {
    text: "I got 99 problems but _ ain't one.",
    pick: 1
  },
  {
    text: "What's a girl's best friend?",
    pick: 1
  },
  {
    text: "What's that smell?",
    pick: 1
  },
  {
    text:
      "This is the way the world ends / This is the way the world ends / Not with a bang but with _.",
    pick: 1
  },
  {
    text: "What is Batman's guilty pleasure?",
    pick: 1
  },
  {
    text: "TSA guidelines now prohibit _ on airplanes.",
    pick: 1
  },
  {
    text: "What ended my last relationship?",
    pick: 1
  },
  {
    text:
      "MTV's new reality show features eight washed-up celebrities living with _.",
    pick: 1
  },
  {
    text: "I drink to forget _.",
    pick: 1
  },
  {
    text:
      "I'm sorry, Professor, but I couldn't complete my homework because of _.",
    pick: 1
  },
  {
    text: "Alternative medicine is now embracing the curative powers of _.",
    pick: 1
  },
  {
    text: "What's that sound?",
    pick: 1
  },
  {
    text: "What's the next Happy Meal toy?",
    pick: 1
  },
  {
    text: "It's a pity that kids these days are all getting involved with _.",
    pick: 1
  },
  {
    text:
      "In the new Disney Channel Original Movie, Hannah Montana struggles with _ for the first time.",
    pick: 1
  },
  {
    text: "_. That's how I want to die.",
    pick: 1
  },
  {
    text: "What does Dick Cheney prefer?",
    pick: 1
  },
  {
    text: "What's the most emo?",
    pick: 1
  },
  {
    text: "Instead of coal, Santa now gives the bad children _.",
    pick: 1
  },
  {
    text: "Next from J.K. Rowling: Harry Potter and the Chamber of _.",
    pick: 1
  },
  {
    text: "A romantic, candlelit dinner would be incomplete without _.",
    pick: 1
  },
  {
    text: "White people like _.",
    pick: 1
  },
  {
    text: "_. Betcha can't have just one!",
    pick: 1
  },
  {
    text: "War!. . What is it good for?",
    pick: 1
  },
  {
    text: "BILLY MAYS HERE FOR _.",
    pick: 1
  },
  {
    text: "_. High five, bro.",
    pick: 1
  },
  {
    text: "During sex, I like to think about _.",
    pick: 1
  },
  {
    text: "What did I bring back from Mexico?",
    pick: 1
  },
  {
    text: "What are my parents hiding from me?",
    pick: 1
  },
  {
    text: "What will always get you laid?",
    pick: 1
  },
  {
    text: "What would grandma find disturbing, yet oddly charming?",
    pick: 1
  },
  {
    text: "What did the U.S. airdrop to the children of Afghanistan?",
    pick: 1
  },
  {
    text: "What helps Obama unwind?",
    pick: 1
  },
  {
    text: "What's there a ton of in heaven?",
    pick: 1
  },
  {
    text:
      "Major League Baseball has banned _ for giving players an unfair advantage.",
    pick: 1
  },
  {
    text:
      "When I am a billionaire, I shall erect a 50-foot statue to commemorate _.",
    pick: 1
  },
  {
    text: "What's the new fad diet?",
    pick: 1
  },
  {
    text:
      "When I am the President of the United States, I will create the Department of _.",
    pick: 1
  },
  {
    text: "_. It's a trap!",
    pick: 1
  },
  {
    text: "How am I maintaining my relationship status?",
    pick: 1
  },
  {
    text:
      "What will I bring back in time to convince people that I am a powerful wizard?",
    pick: 1
  },
  {
    text:
      "While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into research on _.",
    pick: 1
  },
  {
    text: "Coming to Broadway this season, _: The Musical.",
    pick: 1
  },
  {
    text: "What's my secret power?",
    pick: 1
  },
  {
    text: "What gives me uncontrollable gas?",
    pick: 1
  },
  {
    text: "But before I kill you, Mr. Bond, I must show you _.",
    pick: 1
  },
  {
    text: "What never fails to liven up the party?",
    pick: 1
  },
  {
    text: "What am I giving up for Lent?",
    pick: 1
  },
  {
    text: "What do old people smell like? ",
    pick: 1
  },
  {
    text: "The class field trip was completely ruined by _.",
    pick: 1
  },
  {
    text: "When Pharaoh remained unmoved, Moses called down a plague of _.",
    pick: 1
  },
  {
    text:
      "I do not know with which weapons World War III will be fought, but World War IV will be fought with _.",
    pick: 1
  },
  {
    text:
      "What's Teach for America using to inspire inner city students to succeed?",
    pick: 1
  },
  {
    text: "In Michael Jackson's final moments, he thought about _.",
    pick: 1
  },
  {
    text: "Why do I hurt all over?",
    pick: 1
  },
  {
    text:
      "Studies show that lab rats navigate mazes 50% faster after being exposed to _.",
    pick: 1
  },
  {
    text: "Why am I sticky?",
    pick: 1
  },
  {
    text: "What's my anti-drug?",
    pick: 1
  },
  {
    text: "_: Good to the last drop.",
    pick: 1
  },
  {
    text: "What did Vin Diesel eat for dinner?",
    pick: 1
  },
  {
    text: "_: kid-tested, mother-approved.",
    pick: 1
  },
  {
    text: "What gets better with age?",
    pick: 1
  },
  {
    text: "I never truly understood living until I encountered _.",
    pick: 1
  },
  {
    text:
      "Rumor has it that Vladimir Putin's favorite delicacy is stuffed with _.",
    pick: 1
  },
  {
    text: "That's right, I killed you. How, you ask? _.",
    pick: 1
  },
  {
    text: "When I was tripping on acid, I turned into _.",
    pick: 1
  },
  {
    text: "What's the next superhero?",
    pick: 1
  },
  {
    text:
      "Dear Abby,. . I'm having some trouble with _ and would like your advice.",
    pick: 1
  },
  {
    text: "After the earthquake, Sean Penn brought _ to the people of Haiti.",
    pick: 1
  },
  {
    text: "In L.A. County Jail, word is you can trade 200 cigarettes for _.",
    pick: 1
  },
  {
    text: "Maybe she's born with it. Maybe it's _.",
    pick: 1
  },
  {
    text:
      "Life for American Indians was forever changed when the White Man introduced them to _.",
    pick: 1
  },
  {
    text: "Next on ESPN2, the World Series of _.",
    pick: 1
  },
  {
    text:
      "Here is the church. Here is the steeple. Open the doors. And there is _.",
    pick: 1
  },
  {
    text: "How did I lose my virginity?",
    pick: 1
  },
  {
    text:
      "During his childhood, Salvador Dalí produced hundreds of paintings of _.",
    pick: 1
  },
  {
    text:
      "In 1,000 years, when paper money is a distant memory, how will we pay for goods and services?",
    pick: 1
  },
  {
    text: "What don't you want to find in your Kung Pao chicken?",
    pick: 1
  },
  {
    text:
      "The Smithsonian Museum of Natural History has just opened an exhibit on _.",
    pick: 1
  },
  {
    text: "Daddy, why is Mommy crying?",
    pick: 1
  },
  {
    text:
      "And I would have gotten away with it, too, if it hadn't been for ______!",
    pick: 1
  },
  {
    text: "Awww, sick! I just saw this skater do a 720 kickflip into ______!",
    pick: 1
  },
  {
    text:
      "Doctor, you've gone too far! The human body wasn't meant to withstand that amount of ______!",
    pick: 1
  },
  {
    text:
      "Future historians will agree that ______ marked the beginning of America's decline.",
    pick: 1
  },
  {
    text: "He who controls ______ controls the world.",
    pick: 1
  },
  {
    text:
      "I learned the hard way that you can't cheer up a grieving friend with ______.",
    pick: 1
  },
  {
    text:
      "In his new self-produced album, Kanye West raps over the sounds of ______.",
    pick: 1
  },
  {
    text:
      "In its new tourism campaign, Detroit proudly proclaims that it has finally eliminated ______.",
    pick: 1
  },
  {
    text:
      "In Rome, there are whisperings that the Vatican has a secret room devoted to ______.",
    pick: 1
  },
  {
    text:
      "In the distant future, historians will agree that ______ marked the beginning of America's decline.",
    pick: 1
  },

  {
    text: "My plan for world domination begins with ______.",
    pick: 1
  },
  {
    text:
      "Next season on Man vs, Wild, Bear Grylls must survive the depths of the Amazon with only ______ and his wits.",
    pick: 1
  },
  {
    text:
      "Next week on Discovery Channel, one man must survive in the depths of the Amazon with only _____ and his wits.",
    pick: 1
  },
  {
    text: "Science will never explain ______.",
    pick: 1
  },
  {
    text: "Science will never explain the origin of ______.",
    pick: 1
  },
  {
    text:
      "The CIA now interrogates enemy agents by repeatedly subjecting them to ______.",
    pick: 1
  },
  {
    text:
      "The secret to a lasting marriage is communication, communication, and ______.",
    pick: 1
  },
  {
    text:
      "The socialist governments of Scandinavia have declared that access to ______ is a basic human right.",
    pick: 1
  },
  {
    text:
      "This season on Man vs. Wild, Bear Grylls must survive in the depths of the Amazon with only ______ and his wits.",
    pick: 1
  },
  {
    text: "What brought the orgy to a grinding halt?",
    pick: 1
  },
  {
    text: "What has been making life difficult at the nudist colony?",
    pick: 1
  },
  {
    text: "What's the gift that keeps on giving?",
    pick: 1
  },
  {
    text: "When all else fails, I can always masturbate to ______.",
    pick: 1
  },
  {
    text: "When I pooped, what came out of my butt?",
    pick: 1
  }
];

module.exports = questions;
