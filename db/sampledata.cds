namespace db.sampledata;

entity Store {
    key ProductID: UUID;
    ProductName: String(100);
    Description: String(255);
    CreatedAt: DateTime;
    Price: Decimal(10, 2);
}
