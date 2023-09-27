const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load the protobuf file dynamically
const protoPath = path.join(__dirname, "currency.proto");
const packageDefinition = protoLoader.loadSync(protoPath);
const currencyProto = grpc.loadPackageDefinition(packageDefinition).currency;

// Create gRPC client
const client = new currencyProto.CurrencyConverter(
  "localhost:50051",
  grpc.credentials.createInsecure()
  );
console.log("Client Connected..")

// Function to convert currency
function convertCurrency(fromCurrency, toCurrency, amount) {
  const request = {
    from_currency: fromCurrency,
    to_currency: toCurrency,
    amount: amount,
  };

  client.Convert(request, (err, response) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log(
        `Converted ${amount} ${fromCurrency} to ${response.converted_amount} ${toCurrency}`
      );
    }
  });
}

// Test the client
convertCurrency("USD", "EUR", 100.00);
