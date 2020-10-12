import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Background from "../components/Background";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import LoginHeader from "../components/LoginHeader";

import {
  emailValidator,
  passwordValidator,
  password2Validator,
} from "../core/utils";

const RegisterScreen = ({ navigation }) => {
  const [password2, setPassword2] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.token;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const onSignIn = async (usertoken) => {
    try {
      await AsyncStorage.setItem("usertoken", usertoken);
    } catch (error) {
      console.log(error);
    }
  };

  const _onSignUpPressed = () => {
    const password2Error = password2Validator(password2.value, password.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || password2Error) {
      setPassword2({ ...password2, error: password2Error });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      fetch(`http://${domain}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${email.value}`,
          email: `${email.value}`,
          password: `${password.value}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data.username) {
            Alert.alert(
              `Email Already Exists!`,
              `${data.username}!`,
              [
                {
                  text: "Okay",
                  onPress: () =>
                    dispatch({ type: "skipLogin", payload: false }),
                },
              ],
              { cancelable: false }
            );
            // console.log(data.username)
          }
          if (data.token !== undefined) {
            dispatch({ type: "token", payload: data.token });
            onSignIn(data.token);
          }
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoginHeader />
      <Background>
        <BackButton goBack={() => navigation.navigate("HomeScreen")} />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={password2.value}
          onChangeText={(text) => setPassword2({ value: text, error: "" })}
          error={!!password2.error}
          errorText={password2.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              marginHorizontal: 5,
              paddingHorizontal: 10,
            }}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
