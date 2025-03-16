import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectverde/state/favourites/favourites_cubit.dart';
import 'package:projectverde/state/imageRecognition/image_recognition_bloc.dart';
import 'package:projectverde/views/farmer/viewOrders.dart';
import 'package:projectverde/views/user/orders.dart';
import 'package:projectverde/views/user/profile.dart';
import 'Services/awsRekognitionService.dart';
import 'state/authentication/authentication_bloc.dart';
import 'authentication/authMain.dart';
import 'state/orders/orders_bloc.dart';
import 'state/userOrders/user_orders_cubit.dart';
void main() {
  runApp(
      MultiBlocProvider(
          providers:[
         BlocProvider<AuthenticationBloc>(create: (context)=>AuthenticationBloc()),
           BlocProvider<OrdersBloc>(create:(context)=>OrdersBloc()..add(FetchOrders())),
            BlocProvider<ImageRecognitionBloc>(create: (context)=>ImageRecognitionBloc(AwsRekognitionService())),
            BlocProvider<FavouritesCubit>(create: (context)=>FavouritesCubit()),
            BlocProvider<UserOrdersCubit>(create: (context)=>UserOrdersCubit())
      ]
          , child: MaterialApp(
            debugShowCheckedModeBanner: false,
            home : userProfile()
          )
      ));

}
