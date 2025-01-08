import FeedbackForm from '@/components/FeedbackForm';

export default function FeedbackPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">反馈</h1>
            <FeedbackForm />
        </div>
    );
}
