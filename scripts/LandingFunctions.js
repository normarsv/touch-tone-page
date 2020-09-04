export const ImagesRes = [
  {
    dataName: "desktop",
    dataTitle: "Escritorio",
  },
  {
    dataName: "tablet",
    dataTitle: "Tableta",
  },
  {
    dataName: "mobile",
    dataTitle: "Móvil",
  },
];

export const GetPage = (pages, pageName) => {
  const currentPage = pages.find((x) => {
    return x.name === pageName;
  });
  return currentPage;
};

export const GetSection = (sections, sectionName) => {
  const currentSection = sections.find((x) => {
    return x.name === sectionName;
  });
  return currentSection;
};

export const GetContent = (sectionPages, sectionName, contentName) => {
  const section = sectionPages.find((x) => {
    return x.name === sectionName;
  });

  const content = section.contentSections.find((x) => {
    return x.name.includes(contentName) && x.isBase !== true;
  });

  return content;
};

export const GetStringFromContent = (content, textName, language) => {
  let textContent = "";
  if (content !== undefined && content.dataContentStrings !== undefined) {
    const text = content.dataContentStrings.find((x) => {
      return x.name === textName;
    });

    let currentLanguage = getCurrentLanguage(language);

    if (text !== undefined) {
      textContent = text["content" + currentLanguage];
      if (textContent === undefined || textContent === "") {
        textContent = "";
      }
    }
  }
  return textContent;
};

export const GetStringFromSection = (
  sectionPages,
  sectionName,
  contentName,
  textName,
  language
) => {
  const content = GetContent(sectionPages, sectionName, contentName);

  let textContent = "";
  if (content !== undefined && content.dataContentStrings !== undefined) {
    const text = content.dataContentStrings.find((x) => {
      return x.name === textName;
    });

    let currentLanguage = getCurrentLanguage(language);

    if (text !== undefined) {
      textContent = text["content" + currentLanguage];
      if (textContent === undefined || textContent === "") {
        textContent = "";
      }
    }
  }
  return textContent;
};

export const GetFileFromContent = (content, fileName, language) => {
  let fileContent = {
    desktop: "",
    tablet: "",
    mobile: "",
  };
  if (content !== undefined && content.dataContentFiles !== undefined) {
    const file = content.dataContentFiles.find((x) => {
      return x.name === fileName;
    });

    let currentLanguage = getCurrentLanguage(language);

    if (file !== undefined) {
      fileContent = file["file" + currentLanguage];
      if (fileContent === undefined || fileContent === "") {
        fileContent = {
          desktop: "",
          tablet: "",
          mobile: "",
        };
      } else {
        fileContent = {
          desktop:
            fileContent.file.desktop.originalFile ||
            fileContent.file.tablet.originalFile ||
            fileContent.file.mobile.originalFile ||
            "",
          tablet:
            fileContent.file.tablet.originalFile ||
            fileContent.file.mobile.originalFile ||
            fileContent.file.desktop.originalFile ||
            "",
          mobile:
            fileContent.file.mobile.originalFile ||
            fileContent.file.tablet.originalFile ||
            fileContent.file.desktop.originalFile ||
            "",
        };
      }
    }
  }
  return fileContent;
};

export const GetFileFromSection = (
  sectionPages,
  sectionName,
  contentName,
  fileName,
  language
) => {
  const content = GetContent(sectionPages, sectionName, contentName);

  let fileContent = {
    desktop: "",
    tablet: "",
    mobile: "",
  };
  if (content !== undefined && content.dataContentFiles !== undefined) {
    const file = content.dataContentFiles.find((x) => {
      return x.name === fileName;
    });

    let currentLanguage = getCurrentLanguage(language);

    if (file !== undefined) {
      fileContent = file["file" + currentLanguage];
      if (fileContent === undefined || fileContent === "") {
        fileContent = {
          desktop: "",
          tablet: "",
          mobile: "",
        };
      } else {
        fileContent = {
          desktop:
            fileContent.file.desktop.originalFile ||
            fileContent.file.tablet.originalFile ||
            fileContent.file.mobile.originalFile ||
            "",
          tablet:
            fileContent.file.tablet.originalFile ||
            fileContent.file.mobile.originalFile ||
            fileContent.file.desktop.originalFile ||
            "",
          mobile:
            fileContent.file.mobile.originalFile ||
            fileContent.file.tablet.originalFile ||
            fileContent.file.desktop.originalFile ||
            "",
        };
      }
    }
  }
  return fileContent;
};

export const GetBaseArrayFromSection = (
  sectionPages,
  sectionName,
  baseName,
  dataOfBase,
  currentLanguage
) => {
  const section = GetSection(sectionPages, sectionName);

  const baseArray = section.contentSections.filter((x) => {
    return x.name.includes(baseName) && x.isBase !== true;
  });

  baseArray.sort(function (a, b) {
    return parseInt(a.order) - parseInt(b.order);
  });

  const arrayReturn = [];
  for (const currentContent of baseArray) {
    const objectToAdd = {
      id: currentContent.id,
    };
    for (const currentData of dataOfBase) {
      if (currentData.type === "string") {
        const stringData = GetStringFromContent(
          currentContent,
          currentData.dataName,
          currentLanguage
        );
        objectToAdd[currentData.dataName] = stringData;
      } else if (currentData.type === "file") {
        const stringData = GetFileFromContent(
          currentContent,
          currentData.dataName,
          currentLanguage
        );
        objectToAdd[currentData.dataName] = stringData;
      }
    }
    arrayReturn.push(objectToAdd);
  }

  return arrayReturn;
};
