---
title: Rocket Spot
date: September 17, 2019
description: Rocket Spot is an app that provides orientation information based on your current location to spot rockets launched from Satish Dhawan Space Center, Sriharikota (SDSC-SHAR).
tags: JavaScript, React Native
code: true
order: 42
bannerType: playstore
playStoreId: com.messierlabs.rocketspot
references: www.movable-type.co.uk/scripts/latlong.html,www.movable-type.co.uk/scripts/latlong.html
---

The Indian Space Research Organization(ISRO) launches rockets from the island of
Sriharikota situated on the Pulicat lake. This island is about 102 kilometers from Chennai, a coastal city
in the southern part of India.

### **Where is the rocket?**

A lot of people find it hard to believe that rockets launched in Sriharikota can be seen from Chennai.
That is only until they see it with their own eyes though. Earlier, as a part of the Chennai Astronomy Club's outreach
activities, we used to send notifications to people asking them to look *towards north* a few seconds
after a rocket launch. While a good number of people succeeded in spotting them, we realised
that a good number of kids and surprisingly adults did not even know where north was. We had to ask people to use the compass
on their phones to find north.

### **Where is the launch pad?**

Visitors at the Pulicat Bird Sanctuary who arrive there to spot rocket launches face a different issue.
The island of Sriharikota and consequently, the launch pads, are hidden by the dense vegetation on the island.
Tall palm trees all over the island make spotting the launch pads impossible unless you know where exactly to
look for. Coincidentally, the launch pad is almost at east when looking from the
[viewpoint on the Pulicat lake](/seeing-indian-rocket-launches/).
This makes things even worse when a launch is scheduled to take place in the morning or early afternoon.
The glare from the sun and the haze that is always present in this region complicates spotting the four
lightning arrestors around the launch pad that rise above the trees and therefore serve as landmarks to us.
Moreover, there are two launch pads in the island and it is important to figure out which of them is being
used for the current launch. Only then can the lift-off phase of the launch and long exposures in case of
a night launch be done properly.

::: lazy-image src="/static/images/lowres/lift-off.jpg" alt="Lift off" caption="PSLV C27/IRNSS-1D lifting off on a hazy afternoon" style="max-width: 600px; margin: 0 auto;":::

Over the years, this viewpoint started to become crowded and we were often approached by people seeking
help on spotting the correct launch pad.

This is when [Kishan](https://twitter.com/heykishan), a fellow astronomy geek, and I decided to write an app
to try and address these. Overall, we had a few requirements:

* **The app should be comprehensive.** It should cover all our requirements on the ground on the day of
  a rocket launch - everything from spotting the launch pad to knowing when the launch is about to happen.
* **The app should be as minimal as possible.** From our own experience of watching literally every single
  rocket launch over the last 3-4 years, we knew that the app should be real barebones. It should be usable without
  us having to click on anything on the screen because our hands our usually busy setting up cameras.
* **The ability to quickly change launch details and push it to all users.** Rocket launches frequently get rescheduled by a few
  seconds or minutes, for example, to avoid space debris. It is important to have the ability to quickly update the app
  to reflect the new launch timing.

### **Our Solution**

After a bit of brainstorming, we settled upon the following UI.

::: lazy-image src="/static/images/lowres/rocket-spot-ui.jpg" alt="App Design" :::

It essentially has three components:

1) A timer that displays the time left for the upcoming launch.
2) A compass like orientation provider that tells where exactly the launch pad is.
3) A small text description of the rocket, the payload and the launch pad.

### **Obtaining Orientation**

This was essentially the core of the app. We were inspired by bubble levels and decided to implement one
similar to it. Now, the only question was figuring out a way to find the forward bearing between the user's
location(let's call this `A`) and the relevant launch pad(let's call this `B`). `A` can be trivially obtained
by getting the phone's location data. To get accurate coordinates of the launch pads, we went through some
[NOTAM](https://www.notams.faa.gov/dinsQueryWeb/) archives to get the location of the launch pads. While this
could have been done with Google Maps itself, we wanted this to be as accurate as possible so we decided to use
the locations provided on NOTAMs. Now that there are two coordinates, finding the bearing between them can be
accomplished with the following formula<sup>[1]</sup>:

```math
θ = atan2(sin Δλ ⋅ cos φ2, cos φ1 ⋅ sin φ2 − sin φ1 ⋅ cos φ2 ⋅ cos Δλ )

where φ1, λ1 is the start point, φ2, λ2 the end point, Δλ is the difference in longitude
```

### **Getting Launch Details**

We spawned a simple API server on [zeit's now.sh](https://zeit.co/home).
It returns a JSON with the following structure:

```json
{
  // Time in GMT
  "date": "2019-07-22T09:13:00.000Z",
  "launch_pad": 2,
  "name": "PSLV C27/IRNSS-1D"
}
```

The launch details are tracked in a Git repository on GitHub and all it takes to
update the data is making a commit. Since the structure of the response JSON is rather
trivial, it is a breeze to update it even while travelling. 

We used [React Native](https://facebook.github.io/react-native/) to build the app. As both of us
have been building front-end applications for several years now, this was a breeze. There is also
the advantage of being able to target multiple platforms(Android and iOS) using the same codebase.

After almost a year of using it ourselves and sharing it with people that asked for it in Sriharikota
and social media, I finally published it in the Play Store last week.
