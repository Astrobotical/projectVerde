import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'state/authentication/authentication_bloc.dart';
import 'authentication/authMain.dart';
import 'state/orders/orders_bloc.dart';
void main() {
  runApp(
      MultiBlocProvider(
          providers:[
         BlocProvider<AuthenticationBloc>(create: (context)=>AuthenticationBloc()),
           BlocProvider<OrdersBloc>(create:(context)=>OrdersBloc()),

      ]
          , child: MaterialApp(
            debugShowCheckedModeBanner: false,
            home : authMain()
          )
      ));

}
