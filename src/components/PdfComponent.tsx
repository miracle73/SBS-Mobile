import { View, Text, SafeAreaView, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import Pdf from "react-native-pdf";

interface PDF {
  uri: string;
  cache: boolean;
}
interface PdfComponentModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  pdfUrl: PDF;
}

const PdfComponent = ({ setModal, modal, pdfUrl }: PdfComponentModalProps) => {
  const [secondModal, setSecondModal] = useState(false);
  //   const pdfUrl = {
  //     uri: "https://sbsapp.com.ng/static/CHAPTER_THREE_SOLUTION_OF_A_DIFFERENTIAL_EQUATION.pdf",
  //     cache: true,
  //   };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Pdf
          trustAllCerts={false}
          source={pdfUrl}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${numberOfPages}`);
          }}
          onError={(error) => {
            console.log(error);
            setSecondModal(true);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{ flex: 1, alignSelf: "stretch" }}
        />
        {secondModal && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>File not in PDF format or corrupted</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PdfComponent;
