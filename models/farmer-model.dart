class Farmer {
  String name, id;
  Coordinates coordinates;
  List<AvailableItem> availableItems;
  double walletBalance;
  double rating;

  Farmer(
      {required this.name,
      required this.coordinates,
      required this.availableItems,
      required this.walletBalance,
      required this.rating,
      required this.id});
}

class Coordinates {
  double latitude;
  double longitude;

  Coordinates({required this.latitude, required this.longitude});
}

class AvailableItem {
  String id;
  double price;

  AvailableItem({required this.id, required this.price});
}
