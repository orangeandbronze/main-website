---
layout:       blog
title:        "Basic Image Editing with GIMP - (Part 2)"
authors:      Mike Pua
tags:         gimp
header-image: /assets/images/2021-02-18-basic-image-editing-with-gimp/basic-image-editing-with-gimp-part2.png
---

In [part 1](/blogs/2021/02/basic-image-editing-with-gimp-part1){:target="_blank"}, we learned about what GIMP is, its commonly used windows, and how to draw lines. In this part, we will cover exporting images, and drawing shapes.

## Table Of Contents

* [How to Export an Image](#how-to-export-an-image)
* [How to Draw a Rectangle](#how-to-draw-a-rectangle)
* [How to Draw a Circle](#how-to-draw-a-circle)
* [How to Crop an Image](#how-to-crop-an-image)
* [How to Edit a PDF File](#how-to-edit-a-pdf-file)
* [Summary](#summary)

## How to Export an Image

Exporting an image generates the actual image file to the popular image formats you need. To png or jpg for example. To export, press _Ctrl + Shift + E_ on your keyboard. To export using your mouse, click _File > Export As…_.  

![Export Prompt](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-export-prompt.png "Export Prompt")

From the sample image above, the exported image will be named _Lines.**png**_. The image format is png based on the file name extension. You can update the file name (e.g. to _Lines.**jpg**_ or _Lines.**bmp**_) and GIMP will automatically save it to the format you specified.

## How to Draw a Rectangle

Drawing shapes with GIMP is a matter of getting used to.  
To draw a rectangle
- Create a new image by left-clicking _File > New…_.
- Enable the Rectangle Select Tool by clicking it on the Toolbox.

  ![Toolbox with Rectangle Select Tool Enabled](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-rectangle-tool.png "Toolbox with Rectangle Select Tool Enabled")

- On the canvas, select the rectangle area by dragging the mouse.
  ![Canvas with Selected Rectangle Area](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-rectangle-area.png "Canvas with Selected Rectangle Area")
- Click _Select > Border…_.
  ![Border Selection Dialog](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-border-prompt.png "Border Selection Dialog")
- On the Border Selection Dialog
  - Set 1 or 2 as border width.
  - For simplicity, let’s use pixels (px) as a measurement unit.
  - Then, click OK.
- Once done with the Border Selection Dialog, _click Edit > Fill with FG Color_.
  ![Rectangle with 2-pixel Border Width](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-rectangle.png "Rectangle with 2-pixel Border Width")

## How to Draw a Circle

Drawing a circle is a bit similar when drawing a rectangle.
- Create a new image by left-clicking _File > New…_.
- Enable the Ellipse Select Tool by clicking it on the Toolbox.
  ![Toolbox with the Ellipse Select Tool Enabled](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-ellipse-tool.png "Toolbox with the Ellipse Select Tool Enabled")

- On the Tool options, make sure that any ellipse we draw is a perfect circle.
  - Tick Expand from center.
  - Tick Fixed Aspect Ratio. You may need to select Fixed Aspect Ratio first.  
  ![Toolbox with the Ellipse Select Tool Enabled](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-ellipse-tool-options.png "Toolbox with the Ellipse Select Tool Enabled")

- On the canvas, select the circle area by dragging the left mouse key.
![Sample Circle Area Selected](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-circle-area.png "Sample Circle Area Selected")
- Click _Select > Border…_.
  ![Border Selection Dialog](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-border-prompt.png "Border Selection Dialog")

- On the Border Selection Dialog
  - Set 1 or 2 as border width.
  - For simplicity, let’s use pixels (px) as a measurement unit.
  - Then, click OK.
- Once done with the Border Selection Dialog, click _Edit > Fill with FG Color_.
  ![Circle with 2-pixel Border Width](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-circle.png "Circle with 2-pixel Border Width")

## How to Crop an Image

Cropping lets you clip the image. This is a way to remove unwanted or distracting outer areas.
- Open a picture file with GIMP by clicking _File > Open…_.
- Once the image is loaded on the Image Window, select Crop Tool on the Toolbox.  
  ![Toolbox with Crop Tool Enabled](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-crop-tool.png "Toolbox with Crop Tool Enabled")
- Drag the mouse on the canvas to select the image area to be retained a.k.a. crop area.
  ![Image with Crop Area](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-crop-area.png "Image with Crop Area")
  - The Crop area can be moved by dragging its middle area.
  - The Crop area can be resized by dragging its edges.
- Press Enter to apply the Cropping.
  ![Result Image After Cropping](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-cropped-image.png "Result Image After Cropping")

## How to Edit a PDF File

To finalize this post, let’s start filling up a PDF file using the Text Tool.
- Click _File > Open…_.
- Then, select the PDF file for editing.
- On the Import dialog, select the page you want to edit.
  ![Import PDF Dialog](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-import-pdf.png "Import PDF Dialog")
- Set the Zoom to at least 100%.
  ![Zoom Selector on the Status bar](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-zoom.png "Zoom Selector on the Status bar")
- Enable the Text Tool on the Toolbox by clicking on it.
  ![Toolbox with Text Tool Enabled](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-text-tool.png "Zoom Toolbox with Text Tool Enabled")
- Click on the canvas where you want to put the text.
  - Then, start typing.
  - Adjust the text size as needed. In the image below, the text size is currently at 20 pixels (px).
    ![Text Editing using Text Tool](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-text-toolbar.png "Text Editing using Text Tool")
- [Save](/blogs/2021/02/basic-image-editing-with-gimp-part1#how-to-save-your-work){:target="_blank"} your changes so you can continue working on it at a later time.
- To export the edited PDF page, click _File > Export…_.
  - When typing the file name, it must end with **.pdf**.
  ![Export Dialog](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-export-pdf.png "Export Dialog")
- Finally, locate and open the PDF file you just created with GIMP.
![Sample PDF Edited using GIMP](/assets/images/2021-02-18-basic-image-editing-with-gimp/gimp-exported-pdf.png "Sample PDF Edited using GIMP")

**Important notes**  
- By editing a PDF file, this post means filling up PDF forms by adding text or images on top of the contents. GIMP is not designed to edit the existing texts inside PDF files. Please use dedicated PDF-editing tools should you need to edit existing contents.
- Currently, exporting to PDF via GIMP converts the texts inside the original PDF file into an image. Also, GIMP can open PDF pages but can only export one-page PDF at a time.

## Summary

In this two-part blog, we explored the basics of image editing with GIMP such as drawing lines and basic shapes as well as adding texts. Having tried GIMP’s basic functionality, you can now explore more of the basic options and try advanced features like Layers and photo enhancements.











