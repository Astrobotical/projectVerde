class Food {
  String name, id, format, description;

  Food(this.name, this.id, this.format, this.description);

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'id': id,
      'format': format,
      'description': description,
    };
  }

  factory Food.fromJson(Map<String, dynamic> json) {
    return Food(
      json['name'],
      json['id'],
      json['format'],
      json['description'],
    );
  }
}