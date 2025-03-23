// "use client";

// import { useState } from "react";
// import { useAuth } from "@/components/auth-provider";
// import { DashboardLayout } from "@/components/dashboard-layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
// import { Plus, Save, Loader2 } from "lucide-react";

// export default function CreateFlashcardsPage() {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [flashcards, setFlashcards] = useState<{ title: string; content: string; category: string }[]>([]);

//   const addFlashcard = () => {
//     if (!title || !content || !category) {
//       toast({
//         title: "Missing information",
//         description: "Please enter a title, content, and category for your flashcard.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setFlashcards([...flashcards, { title, content, category }]);
//     setTitle("");
//     setContent("");
//     setCategory("");
//     toast({
//       title: "Flashcard added",
//       description: "Your flashcard has been added to the list.",
//     });
//   };

//   const saveFlashcards = async () => {
//     if (flashcards.length === 0) {
//       toast({
//         title: "No flashcards",
//         description: "Please create at least one flashcard before saving.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSaving(true);

//     try {
//       // Simulating API call with timeout
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Save flashcards to localStorage
//       const savedFlashcards = JSON.parse(localStorage.getItem("medilog-flashcards") || "[]");
//       localStorage.setItem("medilog-flashcards", JSON.stringify([...savedFlashcards, ...flashcards]));

//       toast({
//         title: "Flashcards saved",
//         description: `${flashcards.length} flashcards have been saved successfully.`,
//       });

//       // Clear form and flashcards after saving
//       setFlashcards([]);
//       setTitle("");
//       setContent("");
//       setCategory("");
//     } catch (error) {
//       console.error("Error saving flashcards:", error);
//       toast({
//         title: "Error",
//         description: "Failed to save flashcards. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <DashboardLayout role={user?.role || "patient"}>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Create Flashcards</h1>
//           <p className="text-muted-foreground">Create flashcards to help you remember important medical information.</p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Create Flashcards</CardTitle>
//             <CardDescription>Create flashcards by entering information manually.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Flashcard Title</Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="E.g., Medication Name, Doctor's Advice"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="content">Flashcard Content</Label>
//               <Textarea
//                 id="content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Enter the information you want to remember"
//                 className="min-h-[150px]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="category">Flashcard Category</Label>
//               <Input
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder="E.g., Medications, Doctor's Advice"
//               />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={addFlashcard} className="w-full">
//               <Plus className="mr-2 h-4 w-4" />
//               Add Flashcard
//             </Button>
//           </CardFooter>
//         </Card>

//         {flashcards.length > 0 && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Flashcards</CardTitle>
//               <CardDescription>Review your flashcards before saving them.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {flashcards.map((flashcard, index) => (
//                   <Card key={index}>
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-lg">{flashcard.title}</CardTitle>
//                       <CardDescription>{flashcard.category}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-sm">{flashcard.content}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button onClick={saveFlashcards} className="w-full" disabled={isSaving}>
//                 {isSaving ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-2 h-4 w-4" />
//                     Save All Flashcards
//                   </>
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }
"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Save, Loader2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "@/lib/firebase"; // Import Firestore instance from firebase.ts

export default function CreateFlashcardsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [flashcards, setFlashcards] = useState<{ title: string; content: string; category: string }[]>([]);

  const addFlashcard = () => {
    if (!title || !content || !category) {
      toast({
        title: "Missing information",
        description: "Please enter a title, content, and category for your flashcard.",
        variant: "destructive",
      });
      return;
    }

    setFlashcards([...flashcards, { title, content, category }]);
    setTitle("");
    setContent("");
    setCategory("");
    toast({
      title: "Flashcard added",
      description: "Your flashcard has been added to the list.",
    });
  };

  const saveFlashcards = async () => {
    if (flashcards.length === 0) {
      toast({
        title: "No flashcards",
        description: "Please create at least one flashcard before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const flashcardsCollection = collection(db, "FLASH-DATA"); // Reference Firestore collection

      for (const flashcard of flashcards) {
        await addDoc(flashcardsCollection, {
          title: flashcard.title,
          content: flashcard.content,
          category: flashcard.category,
          date: new Date().toISOString(), // Set today's date as ISO string
        });
      }

      toast({
        title: "Flashcards saved",
        description: `${flashcards.length} flashcards have been saved successfully.`,
      });

      // Clear the form and flashcards
      setFlashcards([]);
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error saving flashcards to Firestore:", error);
      toast({
        title: "Error",
        description: "Failed to save flashcards. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout role={user?.role || "patient"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Flashcards</h1>
          <p className="text-muted-foreground">Create flashcards to help you remember important medical information.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Flashcards</CardTitle>
            <CardDescription>Create flashcards by entering information manually.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Flashcard Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Medication Name, Doctor's Advice"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Flashcard Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the information you want to remember"
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Flashcard Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="E.g., Medications, Doctor's Advice"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addFlashcard} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Flashcard
            </Button>
          </CardFooter>
        </Card>

        {flashcards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Flashcards</CardTitle>
              <CardDescription>Review your flashcards before saving them.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {flashcards.map((flashcard, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{flashcard.title}</CardTitle>
                      <CardDescription>{flashcard.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{flashcard.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              
              <Button onClick={saveFlashcards} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save All Flashcards
                  </>
                )}
              </Button>
              
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
