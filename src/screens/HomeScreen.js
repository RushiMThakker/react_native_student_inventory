import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import faker from 'faker';
import Realm from 'realm';

const HomeScreen = ({navigation}) => {
  //Sample code to get initial data in local db to test various functions
  useEffect(() => {
    const StudentSchema = {
      name: 'Student',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string',
        age: 'string',
        food: 'string',
      },
    };
    Realm.open({schema: [StudentSchema], schemaVersion: 1}).then((realm) => {
      const storeStudents = realm.objects('Student');
      if (storeStudents.length === 0) {
        const fastFoodItems = [
          'Vadapav',
          'Misalpav',
          'Khaman',
          'Samosa',
          'BhajiPuv',
          'SevUsal',
          'Khandvi',
          'Gathiya',
          'Jalebi',
          'Poha',
          'Puff',
          'Shahitukda',
          'BreadTikki',
          'Idli',
          'Vada',
          'Dosa',
          'Upma',
          'Puliyogare',
          'Pongal',
          'Vangibath',
          'VegetableBonda',
          'Chaat',
          'BondaSoup',
          'Pohay',
          'Bhajji',
          'Pakora',
          'Thali',
          'Rajmarice',
          'Chinesefood',
          'Pasta',
          'Burger',
          'Wraps&rolls',
          'Chaat',
          'Grilledchicken',
          'Samosa',
          'Dabeli',
          'Donerkebab',
          'Dumbiryani',
          'Fishandchips',
          'Salads',
          'Fruitbeer',
          'Mutarkulcha',
          'Paobhaji',
          'Stuffedparatha',
          'Fruitsalad',
          'Idlisambar',
          'Vadasambar',
          'Dahiwada',
          'Bhajiya',
          'MiniMeals',
          'Chapatiandsabji',
          'koalcha',
          'Momos',
          'Coffee',
          'Tea',
          'Lassi',
          'Fruitpunch',
          'ColdDrinks',
          'Freshfruitjuice',
          'Milkshake',
          'Mocktails',
          'Soup',
        ];
        realm.write(() => {
          let allStudents = realm.objects('Student');
          realm.delete(allStudents); // Deletes all students
        });
        for (let i = 0; i < 50; ++i) {
          realm.write(() => {
            const student = realm.create('Student', {
              id: i + 1,
              name: faker.name.firstName(),
              age: `${Math.round(Math.random() * 30 + 20)}`.toString(),
              food:
                fastFoodItems[Math.round(Math.random() * fastFoodItems.length)],
            });
          });
        }
      }
    });
  }, []);
  return (
    <View style={styles.centeredView}>
      <Image
        source={require('../../assets/school.jpeg')}
        width={120}
        height={120}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('List');
        }}>
        <Text style={styles.textStyle}>Open Student's list</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Add')}>
        <Text style={styles.textStyle}>Enter new student</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    margin: 10,
    color: 'blue',
  },
});

export default HomeScreen;
