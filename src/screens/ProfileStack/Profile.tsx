/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
*/
import React, { useCallback } from 'react';
import {
  Text, 
  View, 
  StyleSheet,
  Button 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as $ACS from '@modules/profile/redux/actions';
import { useAppSelector } from '@utils/redux/store';
import { navigate } from '@src/routers/Router';
import Routes, { ProfileStackParams } from '@src/utils/Routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

function Profile() {

  const counter = useAppSelector((state) => state.ProfileReducer.counter);

  const navigation = useNavigation<StackNavigationProp<ProfileStackParams>>();

  const _counterInc = useCallback(() => $ACS.increment(), []);
  const _counterDec = useCallback(() => $ACS.decrement(), []);
  
  const goToSettings = useCallback(() => navigate(Routes.Settings), []);

  const goToPost = useCallback(() => navigation.navigate(Routes.Post, { id: '1', username: 'Milvasoft' }), [navigation]);
 
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>

        <Text style={styles.fontBlack}>
          Ali Burhan Keskin
        </Text>

        <Text style={styles.container}>
          {counter}
        </Text>

        <View style={styles.button}>

          <Button onPress={_counterInc} title="Increment" />

        </View>

        <View style={styles.button}>

          <Button onPress={_counterDec} title="Decrement" />

        </View>

        <View style={styles.siginButton}>

          <Button onPress={goToPost} title="Go To Post" />

        </View>
        
        <View style={styles.siginButton}>

          <Button onPress={goToSettings} title=" Go To Settings" />

        </View>              

      </View>
    </SafeAreaView>
  );

}

export default Profile;

const styles = StyleSheet.create({
  
  safeView: {
    flex: 1,
  },

  root: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  fontBlack: {
    fontFamily: 'Black'
  },

  counter: {
    marginTop: 30,
    fontSize: 30, 
    color: 'red'
  },

  button: {
    marginTop: 20
  },

  siginButton: {
    marginTop: 50,
  },

});
