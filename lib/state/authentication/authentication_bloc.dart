import 'package:bloc/bloc.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {
  TextEditingController loginEmailBox = TextEditingController();
  TextEditingController loginPasswordBox = TextEditingController();
  
  AuthenticationBloc() : super(AuthenticationInitial());

  Future<void> login() async {
    final client = http.Client();
    try {
      final response = await client.post(
        Uri.parse("http://10.10.2.85:3000/auth/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "email": loginEmailBox.text,
          "password": loginPasswordBox.text,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print("Login successful: ${data['message']}");
        // Handle successful login, such as saving tokens or navigating
      } else {
        print("Login failed: ${response.body}");
        
      }
    } catch (e) {
      print("Error during login: $e");
    } finally {
      client.close();
    }
  }
  
  Future<void> registration() async {
    final client = http.Client();
    try {
      final response = await client.post(
        Uri.parse("http://10.10.2.85:3000/auth/register"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": "Test User", // Update to collect from input
          "email": loginEmailBox.text,
          "password": loginPasswordBox.text,
        }),
      );

      if (response.statusCode == 201) {
        final data = jsonDecode(response.body);
        print("Registration successful: ${data['message']}");
        // Handle successful registration, such as navigating to login
      } else {
        print("Registration failed: ${response.body}");
        // Handle registration failure (show error message)
      }
    } catch (e) {
      print("Error during registration: $e");
    } finally {
      client.close();
    }
  }
}
