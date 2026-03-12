import LeadershipMessageForm from "@/components/LeadershipMessageForm";
import LeadershipMessage from "@/components/LeadershipMessage";

export default function LeadershipMessagesAdminPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Leadership Messages Management</h1>

      {/* Upload Form */}
      <section className="border rounded p-6">
        <h2 className="text-lg font-medium mb-4">Add New Message</h2>
        <LeadershipMessageForm buttonLabel="Add Message" isEditing={false} />
      </section>

      {/* Existing Messages */}
      <section>
        <h2 className="text-lg font-medium mb-4">Existing Messages</h2>
        <LeadershipMessage />
      </section>
    </div>
  );
}
