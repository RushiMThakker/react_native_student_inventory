import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Table = ({headings, data, detailCallback}) => {
  const renderRow = (rowData) => {
    return rowData.map((rowItem, index) => (
      <View style={styles.rowItemStyle}>
        <Pressable
          onPress={() => {
            if (index === 0) {
              detailCallback(rowItem);
            }
          }}>
          <Text
            style={[
              styles.rowItemTextStyle,
              index === 0 ? {textDecorationLine: 'underline', color:'blue'} : null,
            ]}>
            {rowItem}
          </Text>
        </Pressable>
      </View>
    ));
  };

  const renderHeadings = () => {
    return headings.map((heading) => (
      <View style={styles.rowItemStyle}>
        <Text style={styles.headingTextStyle}>{heading}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.rowStyle}>{renderHeadings()}</View>

      {data.map((datum) => {
        return <View style={styles.rowStyle}>{renderRow(datum)}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  rowItemStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'blue',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  headingTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 5,
  },
  rowItemTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 5,
  },
});

export default Table;
