import 'package:flutter/material.dart';
import '../services/api.dart';

class KundliScreen extends StatefulWidget {
  final void Function(Map<String, dynamic>)? onDataGenerated;

  const KundliScreen({super.key, this.onDataGenerated});

  @override
  State<KundliScreen> createState() => _KundliScreenState();
}

class _KundliScreenState extends State<KundliScreen> {
  final dateCtrl = TextEditingController(text: "2005-07-10");
  final timeCtrl = TextEditingController(text: "10:59");
  final latCtrl = TextEditingController(text: "8.5241");
  final lonCtrl = TextEditingController(text: "76.9366");

  Map<String, dynamic>? data;
  bool loading = false;

  Future<void> loadChart() async {
    setState(() => loading = true);
    try {
      final result = await AstrologyAPI.getFullChart(
        date: dateCtrl.text,
        time: timeCtrl.text,
        latitude: double.parse(latCtrl.text),
        longitude: double.parse(lonCtrl.text),
      );
      setState(() => data = result);
      if (widget.onDataGenerated != null) {
        widget.onDataGenerated!(result);
      }
    } catch (_) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Error generating chart")),
      );
    }
    setState(() => loading = false);
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        birthDetailsCard(),
        const SizedBox(height: 20),
        if (loading) const Center(child: CircularProgressIndicator()),
        if (data != null) ...[
          sectionTitle("Planetary Positions"),
          planetGrid(data!["planets"]),
          sectionTitle("Dasha"),
          infoCard(data!["dasha"]),
          sectionTitle("Predictions"),
          predictionCard(data!["predictions"]),
        ],
      ],
    );
  }

  Widget birthDetailsCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Birth Details",
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            field("Date (YYYY-MM-DD)", dateCtrl),
            field("Time (HH:MM)", timeCtrl),
            field("Latitude", latCtrl),
            field("Longitude", lonCtrl),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: loadChart,
                child: const Text("Generate Kundli"),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget field(String label, TextEditingController ctrl) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: TextField(
        controller: ctrl,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
          fillColor: const Color(0xFF0B0B15),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );
  }

  Widget sectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Text(title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
    );
  }

  Widget planetGrid(Map planets) {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 3,
      children: planets.entries.map<Widget>((e) {
        return Card(
          child: Center(child: Text("${e.key}: ${e.value}°")),
        );
      }).toList(),
    );
  }

  Widget infoCard(String text) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Text(text),
      ),
    );
  }

  Widget predictionCard(Map predictions) {
    return Column(
      children: predictions.entries.map<Widget>((e) {
        return Card(
          child: ListTile(
            title: Text(e.key.toUpperCase()),
            subtitle: Text(e.value),
          ),
        );
      }).toList(),
    );
  }
}
