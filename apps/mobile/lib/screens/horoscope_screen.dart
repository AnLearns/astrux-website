import 'package:flutter/material.dart';

class HoroscopeScreen extends StatelessWidget {
  final Map<String, dynamic>? data;

  const HoroscopeScreen({super.key, required this.data});

  @override
  Widget build(BuildContext context) {
    if (data == null) {
      return const Center(
        child: Text("Generate Kundli to view Horoscope"),
      );
    }

    final predictions = data!["predictions"];

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        horoscopeCard("Personality", predictions["personality"]),
        horoscopeCard("Career", predictions["career"]),
        horoscopeCard("Marriage", predictions["marriage"]),
        horoscopeCard("Health", predictions["health"]),
      ],
    );
  }

  Widget horoscopeCard(String title, String text) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title,
                style: const TextStyle(
                    fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(text),
          ],
        ),
      ),
    );
  }
}
