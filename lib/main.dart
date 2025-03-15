import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'state/authentication/authentication_bloc.dart';
import 'authentication/authMain.dart';
void main() {
  runApp(
      MultiBlocProvider(
          providers:[
         BlocProvider<AuthenticationBloc>(create: (context)=>AuthenticationBloc(),
         )
      ]
          , child: MaterialApp(
            debugShowCheckedModeBanner: false,
            home : authMain()
          )
      ));

}
