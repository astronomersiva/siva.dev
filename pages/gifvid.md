title: gifvid
date: May, 2018
description: Converts a GIF to an MP4 using ffmpeg
tags: Tooling
order: 23

I decided to convert some GIFs in this website to MP4 videos after reading this [thoroughly researched blog](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/) by Jeremy Wagner.

When I tested it out however, I found that the videos were working only in Chrome. After a bit of Googling, I figured out the right params to be passed to the ffmpeg and it was over 200 characters long. There was no way I was going to remember this. Setting up an alias was the only solution if I ever wanted to use this again.

I had never written any major bash script as of then so I wanted to try making this as one.

#### **Installation**

* Install ffmpeg(`brew install ffmpeg` on macOS).
* Clone the [repo](https://github.com/astronomersiva/gifvid).
* Run `chmod +x gifvid`.
* Copy this to the bin path by running `cp gifvid /usr/bin`. Use `sudo` if needed.

#### **Usage**

`gifvid source`

`source` is mandatory. The converted video will be written to `source.mp4`.

#### **CLI Flags**

* `-s`
* `--src` - Specify the source.
* `-d`
* `--dest` - Specify the destination. Will be `source.mp4` if not given.
* `-c`
* `--crf` - Constant Rate Factor. Defaults to `25`. Lower the number, higher the quality and file size.
