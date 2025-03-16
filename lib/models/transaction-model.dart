import 'food-model.dart';

class Transaction {
  late String transactionId;
  String farmerId, buyerId;
  late String boughtAt, deliveredAt;
  double totalPrice;
  List<Food> items = [];

  Transaction(
      {required this.farmerId,
      required this.buyerId,
      required this.totalPrice}) {
    boughtAt = DateTime.now().toString();
  }
}
