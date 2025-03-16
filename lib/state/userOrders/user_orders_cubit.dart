import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'user_orders_state.dart';

class UserOrdersCubit extends Cubit<UserOrdersState> {
  UserOrdersCubit() : super(UserOrdersInitial());
}
