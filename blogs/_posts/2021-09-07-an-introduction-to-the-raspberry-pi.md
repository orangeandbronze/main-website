---
layout:       blog
title:        "An Introduction to the Raspberry Pi"
authors:      Christopher Sajol
tags:         [Raspberry Pi]
header-image: /assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/Introduction-to-raspberry-pi-banner.png
---
**Outline**

- [An Introduction to the Raspberry Pi](#an-introduction-to-the-raspberry-pi)
  - [What is a Raspberry Pi?](#what-is-a-raspberry-pi)
  - [Hardware Features](#hardware-features)
    - [About the CSI, DSI, and GPIO](#about-the-csi-dsi-and-gpio)
  - [Software Features](#software-features)
  - [Getting Started with Your Raspberry Pi](#getting-started-with-your-raspberry-pi)
    - [Standard Installation](#standard-installation)
      - [Installing the OS](#installing-the-os)
        - [Using the Raspberry Pi Imager](#using-the-raspberry-pi-imager)
          - [Step 1: Downloading and Installing the Raspberry Pi Imager](#step-1-downloading-and-installing-the-raspberry-pi-imager)
          - [Step 2: Writing the OS to the SD card](#step-2-writing-the-os-to-the-sd-card)
        - [Using Etcher](#using-etcher)
          - [Step 1. Downloading and Installing Etcher](#step-1-downloading-and-installing-etcher)
          - [Step 2. Downloading the Image for the OS](#step-2-downloading-the-image-for-the-os)
          - [Step 3. Flashing the Image to the SD card](#step-3-flashing-the-image-to-the-sd-card)
      - [Setting up Your Peripherals](#setting-up-your-peripherals)
      - [Some Finishing Touches](#some-finishing-touches)

## What is a Raspberry Pi?

The Raspberry Pi is a low-cost, credit card-sized (or smaller, depending on the model), [single-board computer](https://en.wikipedia.org/wiki/Single-board_computer){:target="_blank"} (SBC) developed by the Raspberry Pi Foundation. You can compare it to your usual computer albeit, at a lower processing speed. The main goal of the foundation is to ["put the power of computing and digital making into the hands of people all over the world"](https://www.raspberrypi.org/about/){:target="_blank"}. With this in mind, the Raspberry Pi SBCs are used in many different applications, ranging from educational up to industrial purposes. Personally, my Pi at home serves as a media server, emulation station, ad-blocker, and sometimes, a development board to test out some sensors and modules. In the following sections, we will look at the different features that the Raspberry Pi SBCs offer.

## Hardware Features

<figure style="text-align:center;">
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/rpi4b_edited.png" alt="Raspberry Pi 4B" style="vertical-align:center;"/>
  <figcaption align="center">A Raspberry Pi 4B</figcaption>
</figure>

This series of small computers feature a system on a chip (SoC) having an ARM processor. At the time of writing, the latest model under the standard form factor is the Raspberry Pi 4 Model B. It has a 64-bit quad-core ARM Cortex-A72 processor running at 1.5 GHz, and can have a RAM of up to 8GB, depending on your needs. All of the Pi SBCs use micro SD cards for booting the OS as well as for storage. Below is a summary of the hardware features and differences between the Raspberry Pi models\* 3B+ and 4B:

| Model            | SoC       | Processor Frequency | RAM                         | Form Factor |
| ---------------- | --------- | ------------------- | --------------------------- | ----------- |
| Raspberry Pi 3B+ | BCM2837B0 | 1.4 GHz             | 1GB LPDDR2                  | Standard    |
| Raspberry Pi 4B  | BCM2711   | 1.5 GHz             | 2GB, 4GB or 8GB LPDDR4-3200 | Standard    |

In terms of wireless connectivity, the models above have support for Bluetooth connectivity (both [BR/EDR and BLE](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/){:target="_blank"}), as well as dual-band (2.4 GHz and 5 GHz) wireless LAN. For wired connectivity, all of the models above support Gigabit Ethernet.

The Raspberry Pi SBCs also support different peripherals. The ports and connectors needed for them are summarized below:

| Model            | USB Ports                 | Display Output                      | DSI and CSI Connectors | GPIO Pins | Audio and Composite Video Port |
| ---------------- | ------------------------- | ----------------------------------- | ---------------------- | --------- | ------------------------------ |
| Raspberry Pi 3B+ | 4x USB 2.0                | 1x Regular-sized HDMI (up to 1080p) | Yes                    | 40 Pins   | Yes                            |
| Raspberry Pi 4B  | 2x USB 3.0 and 2x USB 2.0 | 2x Micro HDMI (up to 4Kp60)         | Yes                    | 40 Pins   | Yes                            |

> \* There are many other families and models of the Raspberry Pi that are not included here such as the 3A+, Zero W, 400, etc... You can check them all out at the [Raspberry Pi products page](https://www.raspberrypi.org/products/){:target="_blank"}

### About the CSI, DSI, and GPIO

You might have been reading the summary above and are wondering, "What the heck are those DSI, CSI, and GPIO things?". Well, aside from the ports that you usually use to connect peripheral devices (such as USB ports, HDMI ports, etc...), the Raspberry Pi also has these other connectors used to connect other electronic devices or modules.

DSI and CSI stand for **D**isplay Serial Interface and **C**amera Serial Interface, respectively. They are used to connect a camera module and a display using a [CSI or DSI cable thingy](https://www.adafruit.com/product/3671){:target="_blank"} (no joke, this is how Adafruit calls this product due to how their customers reference it by that name). This makes it easier for enthusiasts to develop projects such as a [DIY Touchscreen Camera](https://learn.adafruit.com/diy-wifi-raspberry-pi-touch-cam){:target="_blank"}. But maybe you wanted to do more. Maybe you want to light up an LED or even start your robotics project. Then this is where the GPIO pins shine.

GPIO stands for **G**eneral-**P**urpose **I**nput/**O**utput and are used to perform digital input or output stuff. The Raspberry Pi models above feature a 40-pin GPIO header but not all of those pins are used for input or output. Some of them are used as power sources or grounding pins. Below is an image of the GPIO layout for the models above\*:

<figure style="text-align:center;">
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/gpio-config.png" alt="GPIO Layout for the Raspberry Pi 4B">
  <figcaption align="center">GPIO Layout for the Raspberry Pi 4B <i>from <a href="https://learn.sparkfun.com/tutorials/introduction-to-the-raspberry-pi-gpio-and-physical-computing/gpio-pins-overview" target="_blank">learn.sparkfun.com</a></i></figcaption>
</figure>

> \* If you already have your Pi setup, you can see the GPIO layout by starting a terminal and executing the `pinout` command

These GPIO pins can be controlled and programmed using Python and the RPi.GPIO module.

## Software Features

As the Raspberry Pi is a single-board computer, it supports many different operating systems such as:

- Raspberry Pi OS (formerly known as Raspbian)
- FreeBSD
- Arch Linux ARM
- Kali Linux
- Ubuntu Core
- Window IoT Core
- RetroPie

> In the [Getting Started](#getting-started-with-your-raspberry-pi){:target="_blank"} guide later, we will be using the Raspberry Pi OS as it provides a good starting point for beginners.

The Pi SBCs are also a good starting point for those who want to learn how to code, as some programming languages are already available out of the box.

Now that I have introduced some of the basic features of the Raspberry Pi, let's go and set one up.

## Getting Started with Your Raspberry Pi

### Standard Installation

What you will need:

- Raspberry Pi (the model used here is a Raspberry Pi 3 Model B+)
- Micro SD card (preferably 8GB or greater) and an adaptor
- Another computer that has an SD card reader
- Keyboard and mouse
- Power Supply
  > The Raspberry Pi models 1, 2, and 3 use a micro USB power supply, while the model 4 uses a USB Type-C connector. It is recommended to use the official power supply to ensure a proper performance out of your Pi.
- Monitor and an HDMI cable
  > If you have a Raspberry Pi 4, a micro HDMI cable is needed
- Ethernet Cable (optional)

#### Installing the OS

> Before proceeding, be sure to backup any important files in your SD card, as this step will overwrite its contents

##### Using the Raspberry Pi Imager

###### Step 1: Downloading and Installing the Raspberry Pi Imager

You can download the Raspberry Pi Imager software [here](https://www.raspberrypi.org/software/){:target="_blank"}. You should be redirected to the website in the screenshot below. From there, simply select the distribution that matches your operating system.

![Raspberry Pi Imager Website](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/rpi-imager-site.png)

Once downloaded, you can go ahead and install it in your system for use. After the installation, you will be greeted by the following screen:

![Raspberry Pi Imager GUI](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/rpi-imager.png)

###### Step 2: Writing the OS to the SD card

If you haven't yet, go ahead and insert your SD card to your computer.

Once the Raspberry Pi Imager starts, select `Choose OS`. A popup shows that lets you select the operating system you want to install. For now, simply choose **Raspberry Pi OS (32-bit)**

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/choose_os.png"/>
</figure>

After selecting your desired operating system, click choose storage and select your SD card.

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/choose_storage.PNG"/>
</figure>

After selecting your storage, go ahead and click `Write`. A warning will pop up. If you haven't backed up your files yet, select `No` and do so. Otherwise, if you are ready to proceed, simply select `Yes`.

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/writing_os.PNG"/>
</figure>

Once the process is complete, you can eject the SD card and insert it on your Pi.

##### Using Etcher

If for some reason, you are having problems using the Raspberry Pi Imager, or you simply do not want to use it, you can use other tools to write the image to your SD card. I recommend using [Etcher](https://www.balena.io/etcher/){:target="_blank"}. This tool is closely similar to the Raspberry Pi Imager. The only difference is that you have to manually obtain the `.img` file for the OS you want to install.

###### Step 1. Downloading and Installing Etcher

You can download Etcher using this [link](https://www.balena.io/etcher/){:target="_blank"}. You will be redirected to the website in the screenshot below. Simply select the distribution that matches your operating system from the dropdown.

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/etcher_site.png"/>
</figure>

After downloading, you can go ahead and install it in your system for use later.

###### Step 2. Downloading the Image for the OS

You can download the image file for the Raspberry Pi OS by clicking this [link](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit){:target="_blank"}. You can choose to download the operating system that you want but for now, go ahead and download the `Raspberry Pi OS with desktop`.

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/rpi_os_site.png"/>
</figure>

###### Step 3. Flashing the Image to the SD card

Once Etcher is started, select the `Flash from file` option and choose the downloaded file from Step 2. The `.img` file inside the zip file should automatically be detected. If not, ensure that the zip file is not broken or corrupt. You may also extract the contents of the zip file then select the extracted `.img` file when selecting a file to flash.

![Flash From File](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/flash_from_file.png)
![Etcher Detecting img File](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/etcher_detect_img.png)

After selecting your desired operating system, click `Select target`. A popup will show the available devices on which the image can be written to. Select your SD card from the list.

![Select Target](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/select_target.png)
![Select Target Storage](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/select_target_storage.png)

After selecting your SD card, go ahead and click `Flash!` and wait for the process to finish.

![Flashing Image](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/flashing_img_file.png)

Once the process is complete, you can eject the SD card and insert it on your Pi.

#### Setting up Your Peripherals

After writing an OS to your SD card and inserting it to the Pi, you can go ahead and connect your other peripheral devices such as your keyboard, mouse, monitor, and Ethernet Cable.

<figure>
  <img src="/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/peripherals_connected.jpg" alt="Raspberry Pi with peripherals connected"/>
  <figcaption align="center">Raspberry Pi with peripherals connected</figcaption>
</figure>

After connecting your peripherals, go ahead and connect your power supply. The green and red LEDs near the power connector should light up. Upon booting, you will be greeted by this screen:

![Welcome Screen](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/welcome_screen.png)

#### Some Finishing Touches

Voila! You have successfully booted your Raspberry Pi! Simply follow the on-screen prompts to proceed:

![Setting Location](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/set_time.png)

It is important to change the default password for your Pi. A standard Raspberry Pi OS installation has a default user `pi` and a default password `raspberry`. The prompt below will help you update your password (although you can do it later):

![Change Password Prompt](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/change_passwd.png)

If there are black borders around your display, tick the checkbox once the prompt below shows up. Checking this option will cause the screen to be re-adjusted so that it takes the whole space of the monitor on the next reboot:

![Black Borders Fix](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/black_borders.png)

The setup will also prompt you to connect to your WiFi network:

![Connect to WiFi](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/choose_wifi.png)

You can also choose to update the currently installed software on your Pi. Note that this may take a long time depending on the speed of your network:

![Update Software](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/update_software.png)

Once the whole setup is finished, you will be prompted to restart your Pi:

![Restart Pi](/assets/images/2021-09-07-an-introduction-to-the-raspberry-pi/setup_complete.png)

And that's it! You're done setting up your Pi. Feel free to explore the software available, just like how you would use a normal computer. If you want to get started hacking with your Pi, you can explore the [Raspberry Pi Blog](https://www.raspberrypi.org/blog/){:target="_blank"} to get some ideas.
