'use strict';

const _ = require('lodash');
const userController = require('../user/user.controller');
let PdfPrinter = require('pdfmake');
const models = require('../../models/db');

let Image = models.image;

exports.createPdf = async (req, res) => {

  let profile = await userController.findUserByName(req.param('name'));

  let docDefinition = createPdfContent(profile);

  createPdfBinary(docDefinition, function(binary) {
    let image = new Image();
    image.sourceUrl = binary;
    res.send(image);
  }, function(error) {
    res.send('ERROR:' + error);
  });

};

function createPdfBinary(pdfDoc, callback) {
  let fontDescriptors = {
    Roboto: {
      normal: 'server/api/pdf/fonts/Roboto-Regular.ttf',
      bold: 'server/api/pdf/fonts/Roboto-Medium.ttf',
      italics: 'server/api/pdf/fonts/Roboto-Italic.ttf',
      bolditalics: 'server/api/pdf/fonts/Roboto-MediumItalic.ttf'
    }
  };

  let printer = new PdfPrinter(fontDescriptors);

  let doc = printer.createPdfKitDocument(pdfDoc);

  let chunks = [];
  let result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback('data:application/pdf;base64,' + result.toString('base64'));
  });
  doc.end();

}

function createPdfContent(profile) {
  let experienceList = [];

  profile.profileContent.experienceList.forEach(function (experience) {
    let dataRow = [];

    dataRow.push({
      text: experience.company + ', ' + experience.location,
      fontSize: 11,
      bold: true,
      color: '#2185d0'
    });

    dataRow.push({
      text: experience.title,
      fontSize: 11,
      bold: true,
      color: '#2185d0'
    });

    if (!experience.currentlyWorkHere) {
      dataRow.push({
        text: experience.startDate + ' - ' + experience.endDate + '\n\n',
        fontSize: 11,
        bold: true,
        color: '#2185d0'
      });
    } else {
      dataRow.push({
        text: experience.startDate + ' - ' + 'Present\n\n',
        fontSize: 11,
        bold: true,
        color: '#2185d0'
      });
    }
    dataRow.push(experience.description + '\n\n');

    experienceList.push(dataRow)
  });

  let educationList = [];

  profile.profileContent.educationList.forEach(function (education) {
    let dataRow = [];

    let location = '';

    if(!isNanOrNull(education.location))
      location = ', ' + education.location;

    dataRow.push({
      text: education.schoolName + location,
      fontSize: 11,
      bold: true,
      color: '#2185d0'
    });

    dataRow.push({
      text: education.degreeName + ', ' + education.fieldOfStudy,
      fontSize: 11,
      bold: false,
      color: '#2185d0'
    });

    dataRow.push({
      text: education.fromYear + ' - ' + education.toYearOrExpected + '\n\n',
      fontSize: 11,
      bold: false,
      color: '#2185d0'
    });

    dataRow.push(education.description + '\n\n');

    educationList.push(dataRow)
  });

  let docDefinition = {
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            stack: [
              {text: profile.firstName + ' ' + profile.lastName, style: 'title_header', margin: [-10, 3]},
              {text: profile.occupation, fontSize: 11, bold: true, margin: [-10, 0]}
            ]
          },
          {
            stack: [
              {text: profile.primaryEmail, fontSize: 11, margin: [50, 3]},
              {text: profile.linkedInUrl, fontSize: 11, margin: [50, 3]},
              {text: profile.mobile, fontSize: 11, margin: [50, 3]},
              {text: profile.github, fontSize: 11, margin: [50, 3]},
              {text: profile.website, fontSize: 11, margin: [50, 3]}
            ]
          },
        ],
      },
      {
        stack: [
          {text: '\nSUMMARY\n\n', style: 'title_subheader', alignment: 'center', margin: [-10, 3]},
          {text: profile.profileContent.summary.description, style: 'medium', margin: [-10, 3]},

        ]
      },
      {
        text: '\nEXPERIENCE\n\n', style: 'title_subheader', alignment: 'center', margin: [-10, 3]
      },
      {
        fontSize: 10,
        margin: [-10, 3],
        stack: [
          experienceList
        ]
      },
      {
        text: '\nEDUCATION\n\n', style: 'title_subheader', alignment: 'center', margin: [-10, 3]
      },
      {
        fontSize: 10,
        margin: [-10, 3],
        stack: [
          educationList
        ]
      }
    ],
    styles: {
      header: {
        fontSize: 16,
        alignment: 'justify'
      },
      title_header: {
        fontSize: 16,
        bold: true
      },
      title_subheader: {
        fontSize: 12
      },
      quote: {
        italics: true
      },
      medium: {
        fontSize: 10
      }
    }
  };

  return docDefinition;
}

function isNanOrNull(element) {
  if(element == null || element == "undefined" || element == undefined ||  element == "")
    return true;
  else
    return false;
}
