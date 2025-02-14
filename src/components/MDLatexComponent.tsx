import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { MathpixMarkdownModel, TMarkdownItOptions } from 'mathpix-markdown-it';
import AutoHeightWebView from 'react-native-autoheight-webview'


interface MDLatextTextProps {
  children: React.ReactNode;
  className?: string;
  widthsub?: number;
  fontSize?: number
}


const MDLatextText: React.FC<MDLatextTextProps> = ({ children = '', className, widthsub, fontSize = 14 }) => {


  const options: TMarkdownItOptions = {
    outMath: {
      include_mathml: true,
      include_asciimath: true,
      include_latex: true,
      include_svg: true,
      include_tsv: true,
      include_table_html: true,
    },
    forMD: true
  };

  const htmlContent = `<html>
      <head>
      <style>
        body {
          font-size: ${fontSize}px;
            color: #333;
            margin-bottom: 20px;
            user-select: none;
            overflow: hidden;
            word-wrap: break-word;
            height: auto;
            position: relative;
            line-height: 1.4;
        }
        img {
          width: 100%;
          height: auto;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      ${MathpixMarkdownModel.markdownToHTML(children?.toString() || '', options)}
    </body></html>`;

  return (
    <View style={className ? styles[className] : undefined}>
      <AutoHeightWebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabledWithZoomedin={false}
        style={[styles.webview, { maxWidth: !widthsub ? '100%' : Dimensions.get("window").width - widthsub, minHeight: '100%', overflow: 'hidden' }
        ]}
      />
    </View>
  )
}

const styles: { [key: string]: any } = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default MDLatextText