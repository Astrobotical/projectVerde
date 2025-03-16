import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'orders_event.dart';
part 'orders_state.dart';

class OrdersBloc extends Bloc<OrdersEvent, OrdersState> {
  OrdersBloc() : super(OrdersInitial()) {
    on<OrdersEvent>((event, emit) {});
    on<FetchOrders>((event, emit) {
      emit(OrdersLoaded(["1", "2", "3"]));
    });
  }
}