---
layout:       blog
title:        "Basic Image Editing with GIMP - (Part 1)"
photo:        "https://www.orangeandbronze.com/assets/images/2021-02-18-basic-image-editing-with-gimp/FBimage-BasicImageEditingwithGIMPPart-1.png"
authors:      Mike Pua
tags:         gimp
header-image: /assets/images/2021-02-18-basic-image-editing-with-gimp/basic-image-editing-with-gimp-part1.png
---

Have you ever wondered how to use GNU Image Manipulation Program ([GIMP](https://www.gimp.org/){:target="_blank" rel="noopener noreferrer"}) for your image editing tasks? This two-part tutorial will teach you the basics to start it off.


## Table Of Contents

* [Introduction](#introduction)
* [How to Draw a Line](#how-to-draw-a-line)
* [How to Draw a Straight Line](#how-to-draw-a-straight-line)
* [How to Draw a Horizontal Line](#how-to-draw-a-horizontal-line)
* [How to Draw a Vertical Line](#how-to-draw-a-vertical-line)
* [How to Save Your Work](#how-to-save-your-work)

## Introduction

Let’s first get acquainted with what GIMP is. It is a free and open-source, cross-platform image editor used for image manipulation and editing, free-form drawing, transcoding between different image file formats, and more specialized tasks.

In this blog post, you will learn about the windows and tools you will commonly work with while editing in GIMP. You will also learn how to draw straight lines and how to save your work.

### Main Window

The **Image Window** holds the image you are editing which allows you to work on multiple Image Windows at a time.

![GIMP in Multi-Window Mode](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-multi-window1.png "GIMP in Multi-Window Mode")

If you prefer to work with a single window, select _Windows > Single-Window Mode_.

![GIMP in Single-Window Mode](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-single-window.png "GIMP in Single-Window Mode")  
  
  
### Toolbox Window

The **Toolbox Window** contains the visible Tools & Color selector. The icons on the Toolbox represent the Tools. For each tool selected, the available options appear at the lower portion of the Toolbox. In the example below, the Crop tool is selected and the Crop options are displayed.

![GIMP Toolbox and Tool Options](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-toolbox.png "GIMP Toolbox and Tool Options")

## How to Draw a Line

- Create a new image by left-clicking _File > New…_.  
- On the Main toolbox, click the Pencil Tool.  
    ![Toolbox with the Pencil Tool Selected](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-pencil-tool.png "Toolbox with the Pencil Tool Selected")
- On the canvas (white area), draw the line by dragging the left mouse key.
- Release the left mouse to stop drawing.
    ![Line Sample using the Pencil Tool](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-line.png "Line Sample using the Pencil Tool"){: style="display: block"}
      In this example, maroon is the Foreground color selected. The Background color is white.  
        ![Foreground-Background Color Selector](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-fg-bg-color-selector.png "Foreground-Background Color Selector"){: style="display: block"}
        
## How to Draw a <span style="white-space: nowrap">Straight Line</span>

- Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
   - Click to start the line.
   - Press Shift while moving the mouse pointer to the desired end of the line.
   - Click to set the end of the line.
      ![Straight Line Sample](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-straight-line.png "Straight Line Sample"){: style="display: block"}
      _Shift_ is the key to your straight lines. :)

## How to Draw a <span style="white-space: nowrap">Horizontal Line</span>

- Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
    - Click to start the line.
    - Press _Shift_ key while moving the mouse pointer to the desired end of the line. Make sure the angle is 0&deg; (zero degrees), or
    ![Zero Degrees Angle](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-h-line-0-degrees.png "Zero Degrees Angle"){: style="display: block"}
    180&deg; on the status bar.
    ![180 Degrees Angle](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-h-line-180-degrees.png "180 Degrees Angle"){: style="display: block"}
    - Click to set the end of the line.
    ![Horizontal Line Sample](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-horizontal-line.png "Horizontal Line Sample")

## How to Draw a <span style="white-space: nowrap">Vertical Line</span>

- Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
  - Click to start the line.
  - Press _Shift_ key and move the mouse pointer to the desired end of the line. Make sure the angle is 90&deg;, or
  ![90 Degrees Angle](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-v-line-90-degrees.png "90 Degrees Angle"){: style="display: block"}
  270&deg;.
  ![270 Degrees Angle](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-v-line-270-degrees.png "270 Degrees Angle"){: style="display: block"}
  - Click to set the end of the line.
  ![Vertical Line Sample](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-vertical-line.png "Vertical Line Sample"){: style="display: block"}

This tutorial uses the Pencil tool. As an alternative, you can use any brush tool to draw a line with GIMP.

![Brush Tools Group](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-brush-tools.png "Brush Tool Group")

Drawing your lines can also be done by Smudge, Eraser, Clone, Blur or the Dodge Tool.

## How to Save Your Work  

Saving is important to allow you to continue on your work at a later time. To save, press _Ctrl + S_. Or when using your mouse, click _File > Save…_ This will show a Save Prompt where you can set the file name and folder to put your file into. You can leave the other options as-is. Other options available are _File > Save As…_ and _File > Save a Copy…_.

![Save Prompt](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-save-prompt.png "Save Prompt")  

**Important note**  
Saving you work on GIMP creates an xcf file. To save the actual image file (jpg, png, etc.) that can be displayed on websites or attached to documents, you will have to explicitly Export the image.

XCF is short for eXperimental Computing Facility, the native image format used by GIMP.

*Click [here](/blogs/2021/02/basic-image-editing-with-gimp-part2){:target="_blank"} for the second part of the tutorial.*
