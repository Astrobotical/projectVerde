import 'package:bloc/bloc.dart';
//import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
//import 'package:google_sign_in/google_sign_in.dart';
import 'package:meta/meta.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {
  TextEditingController loginEmailBox = TextEditingController();
  TextEditingController loginPasswordBox = TextEditingController();
  /*
  final googleSignIn = GoogleSignIn();
  GoogleSignInAccount? googleUser;
  GoogleSignInAccount get user => googleUser!;
   */
  AuthenticationBloc() : super(AuthenticationInitial()) {
  }
  /*
  Future googleLogin() async {

    var googleUser = await googleSignIn.signIn();
    if (googleUser == null) return;
    googleUser = googleUser;
    final googleAuth = await googleUser.authentication;
    // Creating a new Credential
    final creds = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    await FirebaseAuth.instance.signInWithCredential(creds);
  }
*/
}
