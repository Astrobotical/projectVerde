class Transaction {
  String transactionId;
  String farmerId;
  String buyerId;
  String status; // pending, confirmed, in transit, delivered
  String boughtAt;
  String? deliveredAt;
  double totalPrice;
  List<String> items; // Store only food item IDs

  Transaction({
    required this.transactionId,
    required this.farmerId,
    required this.buyerId,
    required this.totalPrice,
    required this.items,
    this.status = 'pending',
  }) : boughtAt = DateTime.now().toString();
}
