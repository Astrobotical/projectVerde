class Transaction {
  String farmerId, buyerId;
  late String boughtAt, deliveredAt;

  Transaction({required this.farmerId, required this.buyerId}) {
    boughtAt = DateTime.now().toString();
  }
}
