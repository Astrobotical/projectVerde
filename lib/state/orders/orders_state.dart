part of 'orders_bloc.dart';

@immutable
sealed class OrdersState {}

final class OrdersInitial extends OrdersState {}

class OrdersError extends OrdersState {}
abstract class ViewOrdersState {}

class OrdersLoading extends OrdersState {}

class OrdersLoaded extends OrdersState {
  final List<String> orders;
  OrdersLoaded(this.orders);
}
