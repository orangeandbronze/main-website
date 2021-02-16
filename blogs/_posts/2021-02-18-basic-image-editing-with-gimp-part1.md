---
layout:       blog
title:        "Basic Image Editing with GIMP - (Part 1)"
authors:      Mike Pua
tags:         gimp
header-image: /assets/images/2021-02-18-basic-image-editing-with-gimp/basic-image-editing-with-gimp-part1.png
---
## <a id="introduction-part1"></a>Part 1-Introduction
Have you ever wondered how to use GNU Image Manipulation Program ([GIMP](https://www.gimp.org/){:target="_blank" rel="noopener noreferrer"}) for your image editing tasks? This two-part tutorial will teach you the basics to start it off.

Let’s first get acquainted with what GIMP is. It is a free and open-source, cross-platform image editor used for image manipulation and editing, free-form drawing, transcoding between different image file formats, and more specialized tasks.

In this blog, you will learn about the windows and tools you will commonly work with while editing in GIMP. You will also learn how to draw straight lines and how to save your work.

**Main Window**  
![GIMP in Multi-Window Mode](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-multi-window.png "GIMP in Multi-Window Mode")
- The **Image Window** holds the image you are editing which allows you to work on multiple Image Windows at a time.
  - If you prefer to work with a single window, select _Windows > Single-Window Mode_.
  ![GIMP in Single-Window Mode](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-single-window.png "GIMP in Single-Window Mode")  
  
  
**Toolbox Window**  

- The **Toolbox Window** contains the visible Tools & Color selector. The icons on the Toolbox represent the Tools. For each tool selected, the available options appear at the lower portion of the Toolbox. In the example below, the Crop tool is selected and the Crop options are displayed.

  ![GIMP Toolbox and Tool Options](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-toolbox.png "GIMP Toolbox and Tool Options")

 
---
## <a id="draw-line"></a>How to Draw a Line

- Create a new image by left-clicking _File > New…_.  
- On the Main toolbox, click the Pencil Tool.  
    ![Toolbox with the Pencil Tool Selected](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-pencil-tool.png "Toolbox with the Pencil Tool Selected")
- On the canvas (white area), draw the line by dragging the left mouse key.
- Release the left mouse to stop drawing.
    ![Line Sample using the Pencil Tool](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-line.png "Line Sample using the Pencil Tool")
      In this example, maroon is the Foreground color selected. The Background color is white.  
        ![Foreground-Background Color Selector](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-fg-bg-color-selector.png "Foreground-Background Color Selector")
        
---
## <a id="straight-line"></a>How to Draw a Straight Line

- Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
   - Click to start the line.
   - Press Shift while moving the mouse pointer to the desired end of the line.
   - Click to set the end of the line.

      ![Straight Line Sample](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-straight-line.png "Straight Line Sample")

_Shift_ is the key to your straight lines. :)

---
## <a id="h-line"></a>How to Draw a Horizontal Line

  Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
    - Click to start the line.
    - Press _Shift_ key while moving the mouse pointer to the desired end of the line. Make sure the angle is zero degrees or 180 degrees on the status bar.
    ![Zero Degrees Angle
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-h-line-0-degrees.png "Zero Degrees Angle")
    ![180 Degrees Angle
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-h-line-180-degrees.png "180 Degrees Angle")
    - Click to set the end of the line.
![Horizontal Line Sample
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-horizontal-line.png "Horizontal Line Sample")
---

## <a id="v-line"></a>How to Draw a Vertical Line

- Create a new image by clicking _File > New…_.
- On the Main toolbox, click the Pencil Tool.
- On the canvas
  - Click to start the line.
  - Press _Shift_ key and move the mouse pointer to the desired end of the line. Make sure the angle is 90 degrees or 270 degrees.
  ![90 Degrees Angle
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-v-line-90-degrees.png "90 Degrees Angle")
  ![270 Degrees Angle
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-v-line-270-degrees.png "270 Degrees Angle")
  - Click to set the end of the line.
  ![Vertical Line Sample
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-vertical-line.png "Vertical Line Sample")

This tutorial uses the Pencil tool. As an alternative, you can use any brush tool to draw a line with GIMP.

![Brush Tools Group
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-brush-tools.png "Brush Tool Group")

Drawing your lines can also be done by Smudge, Eraser, Clone, Blur or the Dodge Tool.

---

## <a id="save"></a>How to Save Your Work  

Saving is important to allow you to continue on your work at a later time. To save, press _Ctrl + S_. Or when using your mouse, click _File > Save…_ This will show a Save Prompt where you can set the file name and folder to put your file into. You can leave the other options as-is. Other options available are _File > Save As…_ and _File > Save a Copy…_.

![Save Prompt
](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-save-prompt.png "Save Prompt")  

**Important note**  
Saving you work on GIMP creates an xcf file. To save the actual image file (jpg, png, etc.) that can be displayed on websites or attached to documents, you will have to explicitly [Export](#export) the image.

XCF is short for eXperimental Computing Facility, the native image format used by GIMP.

---