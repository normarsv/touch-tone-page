import PropTypes from "prop-types";
import React, { Component } from "react";

export const OGMetaTagBase = [
  {
    tag: "og:title",
    from: "base",
    key: "title",
  },
  {
    tag: "og:description",
    from: "base",
    key: "description",
  },
  {
    tag: "og:image",
    useImgURL: true,
    from: "base",
    key: "image",
  },
  {
    tag: "og:type",
    from: "text",
    data: "website",
  },
];
//import GoogleTagManager from "./GoogleTagManager";
/**©
 *
 *
 * @class MetaTagsComp
 * @extends {Component}
 */
class MetaTagsComp extends Component {
  static propTypes = {
    /** Meta Tags used */
    metaTags: PropTypes.array,
    /** Meta Tags to replace or add besides metaTags
     * Format of replaceMetaTags:
     * {
     *      name: "string" //name of the tag (title, description, etc)
     *      content: "string" //content of the tag (Guaostudio | Inicio, Somos una empresa creativa, etc)
     *      useImgURL: "bool" //true or false if is an image
     *      isProperty: "bool" //true or false if is the tag use property insted of name
     * }
     */
    replaceMetaTags: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      MetaTags: [],
    };
    this.setMetaTags = this.setMetaTags.bind(this);
    this.addReacSlick = this.addReacSlick.bind(this);
    this.addReacSlick = this.addReacSlick.bind(this);
    this.addReacSlickTheme = this.addReacSlickTheme.bind(this);
    this.setMetaTags();
  }

  setMetaTags() {
    //Check if we have metaTags or replaceMetaTags if no return and do nothing
    if (
      this.props.metaTags === undefined &&
      this.props.replaceMetaTags === undefined
    ) {
      return;
    }

    //Get current metatags
    let currentMetTags = [...this.props.metaTags];

    //If we have replaceMetaTags we replace or add the new meta tags
    if (this.props.replaceMetaTags !== undefined) {
      for (let i = 0; i < this.props.replaceMetaTags.length; i++) {
        const currentReplaceMT = this.props.replaceMetaTags[i];
        const findReplaceMT = currentMetTags.find((metaTagTemp) => {
          return metaTagTemp.name === currentReplaceMT.name;
        });
        if (findReplaceMT === undefined) {
          let addMT = {
            name: currentReplaceMT.name,
            content: currentReplaceMT.content,
            useImgURL:
              currentReplaceMT.useImgURL !== undefined
                ? currentReplaceMT.useImgURL
                : false,
            isProperty:
              currentReplaceMT.isProperty !== undefined
                ? currentReplaceMT.isProperty
                : false,
          };
          currentMetTags.push(addMT);
        } else {
          const indexOfFoundMT = currentMetTags.indexOf(findReplaceMT);
          currentMetTags[indexOfFoundMT].content = currentReplaceMT.content;
          currentMetTags[indexOfFoundMT].useImgURL =
            currentReplaceMT.useImgURL !== undefined
              ? currentReplaceMT.useImgURL
              : currentMetTags[indexOfFoundMT].useImgURL;
          currentMetTags[indexOfFoundMT].isProperty =
            currentReplaceMT.isProperty !== undefined
              ? currentReplaceMT.isProperty
              : currentMetTags[indexOfFoundMT].isProperty;
        }
      }
    }

    //If we have Open Graphs Meta Tags on MainInfo Data we added
    for (let i = 0; i < OGMetaTagBase.length; i++) {
      const currentOG = OGMetaTagBase[i];
      const findOGMT = currentMetTags.find((metaTagTemp) => {
        return metaTagTemp.name === currentOG.tag;
      });
      if (findOGMT === undefined) {
        if (currentOG.from === "base") {
          const keyMT = currentMetTags.find((metaTagTemp) => {
            return metaTagTemp.name === currentOG.key;
          });

          let addMTOG = {
            name: currentOG.tag,
            useImgURL:
              currentOG.useImgURL !== undefined ? currentOG.useImgURL : false,
            content: "",
            isProperty: true,
          };
          if (keyMT !== undefined) {
            addMTOG.content = keyMT.content;
          }
          if (addMTOG.content !== "") {
            currentMetTags.push(addMTOG);
          }
        } else if (currentOG.from === "text") {
          let addMTOG = {
            name: currentOG.tag,
            useImgURL:
              currentOG.useImgURL !== undefined ? currentOG.useImgURL : false,
            content: currentOG.data,
            isProperty: true,
          };
          if (addMTOG.content !== "") {
            currentMetTags.push(addMTOG);
          }
        }
      }
    }
    this.state = {
      MetaTags: currentMetTags,
    };
  }

  componentDidMount() {
    this.addReacSlick();
    this.addReacSlickTheme();
  }

  addReacSlick() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.charset = "UTF-8";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";
    document.body.appendChild(link);
  }

  addReacSlickTheme() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";
    document.body.appendChild(link);
  }

  render() {
    return (
      <>
        {this.state.MetaTags.map((tag, index) => {
          if (tag.name === "title") {
            return <title key={index}>{tag.content}</title>;
          } else if (tag.isProperty === true) {
            return (
              <meta key={index} property={tag.name} content={tag.content} />
            );
          } else {
            return <meta key={index} name={tag.name} content={tag.content} />;
          }
        })}
        <meta
          property="og:url"
          content={typeof window === "undefined" ? "" : window.location.href}
          className="next-head"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </>
    );
  }
}

export default MetaTagsComp;
