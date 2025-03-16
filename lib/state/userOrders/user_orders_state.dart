part of 'user_orders_cubit.dart';

@immutable
sealed class UserOrdersState {}

final class UserOrdersInitial extends UserOrdersState {}

class UserOrdersError extends UserOrdersState {}
class UserOrdersLoading extends UserOrdersState {}

class UserOrdersLoaded extends UserOrdersState{
  final List<String> orders;
  UserOrdersLoaded(this.orders);
}