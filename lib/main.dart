import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectverde/state/imageRecognition/image_recognition_bloc.dart';
import 'package:projectverde/views/farmer/viewOrders.dart';
import 'Services/awsRekognitionService.dart';
import 'state/authentication/authentication_bloc.dart';
import 'authentication/authMain.dart';
import 'state/orders/orders_bloc.dart';
void main() {
  runApp(
      MultiBlocProvider(
          providers:[
         BlocProvider<AuthenticationBloc>(create: (context)=>AuthenticationBloc()),
           BlocProvider<OrdersBloc>(create:(context)=>OrdersBloc()..add(FetchOrders())),
            BlocProvider<ImageRecognitionBloc>(create: (context)=>ImageRecognitionBloc(AwsRekognitionService()))

      ]
          , child: MaterialApp(
            debugShowCheckedModeBanner: false,
            home : viewOrders()
          )
      ));

}
