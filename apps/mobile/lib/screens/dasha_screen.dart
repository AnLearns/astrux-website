import 'package:flutter/material.dart';

class DashaScreen extends StatelessWidget {
  final Map<String, dynamic>? data;

  const DashaScreen({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    if (data == null) {
      return const Center(
        child: Text("Generate Kundli to view Dasha"),
      );
    }

    return Center(
      child: Card(
        margin: const EdgeInsets.all(20),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                "Current Mahadasha",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                data!["dasha"],
                style: const TextStyle(fontSize: 16),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
