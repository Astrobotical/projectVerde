part of 'orders_bloc.dart';

@immutable
sealed class OrdersEvent {}

class FetchOrders extends OrdersEvent {}


