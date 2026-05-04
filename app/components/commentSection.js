'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  // Modal State
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Delete State
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [isAdmin]); // Re-fetch when admin status changes

  async function fetchComments() {
    setIsLoading(true);
    
    let query = supabase
      .from('site_comments')
      .select('*')
      .order('created_at', { ascending: false });

    // If not admin, only fetch public comments
    if (!isAdmin) {
      query = query.eq('is_private', false);
    }

    const { data, error } = await query;

    if (!error) setComments(data || []);
    setIsLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase
      .from('site_comments')
      .insert({ 
        name: name.trim(), 
        message: message.trim(),
        is_private: isPrivate 
      });

    if (error) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setName('');
    setMessage('');
    setIsPrivate(false);
    setIsSubmitting(false);

    // Refresh comments
    await fetchComments();

    // Reset the success state after a moment
    setTimeout(() => setSubmitted(false), 4000);
  }

  function confirmDelete(id) {
    setCommentToDelete(id);
  }

  async function executeDelete() {
    if (!commentToDelete) return;
    setIsDeleting(true);

    const { error } = await supabase
      .from('site_comments')
      .delete()
      .eq('id', commentToDelete);

    if (error) {
      alert("Failed to delete comment.");
    }

    setCommentToDelete(null);
    setIsDeleting(false);

    // Refresh comments
    await fetchComments();
  }

  const handleTitleClick = () => {
    if (isAdmin) {
      // If already admin, clicking 3 times logs out
      clickCount.current += 1;
      if (clickCount.current === 3) {
        setIsAdmin(false);
        clickCount.current = 0;
      }
    } else {
      // If not admin, clicking 3 times prompts for PIN modal
      clickCount.current += 1;
      if (clickCount.current === 3) {
        setShowPinModal(true);
        clickCount.current = 0;
      }
    }

    // Reset click count after 2 seconds of inactivity
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
      // Reset error state for animation
      setTimeout(() => setPinError(false), 500);
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-40 pt-20 border-t border-border"
        id="guestbook"
      >
        {/* Section Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Leave a mark</p>
          <h2 
            className="text-4xl md:text-6xl font-serif text-foreground uppercase tracking-widest font-light inline-block cursor-pointer select-none"
            onClick={handleTitleClick}
          >
            The Guestbook {isAdmin && <span className="text-xl ml-2 text-muted-foreground">🔓</span>}
          </h2>
          <p className="mt-6 text-sm text-muted-foreground font-light max-w-md leading-relaxed">
            Share a thought, a reflection, or a word about what you found here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* ── Form ── */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="comment-name"
                  className="block text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-3"
                >
                  Your Name
                </label>
                <input
                  id="comment-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={60}
                  placeholder="e.g. Ama Owusu"
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground outline-none text-foreground text-base font-medium py-3 placeholder:text-muted-foreground/40 transition-colors duration-500"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="comment-message"
                  className="block text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-3"
                >
                  Your Reflection
                </label>
                <textarea
                  id="comment-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={500}
                  rows={5}
                  placeholder="What did you feel when you looked?"
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground outline-none text-foreground text-base font-medium py-3 placeholder:text-muted-foreground/40 transition-colors duration-500 resize-none leading-relaxed"
                />
                <p className="text-[10px] text-muted-foreground text-right mt-2 tracking-wider">
                  {message.length} / 500
                </p>
              </div>

              {/* Private Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-4 h-4 border transition-colors flex items-center justify-center ${isPrivate ? 'bg-foreground border-foreground' : 'border-border bg-transparent'}`}
                >
                  {isPrivate && (
                    <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <label 
                  className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground cursor-pointer select-none"
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  Keep this private (Only Kwaku Ntiri will see)
                </label>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-red-400 tracking-wider"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="flex items-center gap-8 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !message.trim()}
                  className="text-xs uppercase tracking-[0.3em] text-foreground border border-border px-10 py-4 hover:bg-foreground hover:text-background transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
                    >
                      Received — Thank you.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          {/* ── Comments Feed ── */}
          <div className="space-y-12 max-h-[560px] overflow-y-auto pr-2 scrollbar-hide">
            {isLoading && (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse space-y-3">
                    <div className="h-3 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && comments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  No entries yet. Be the first.
                </p>
              </motion.div>
            )}

            {!isLoading && comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group pb-10 border-b border-border/30 last:border-0 relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground">
                      {comment.name}
                    </p>
                    {comment.is_private && (
                      <span className="text-[8px] uppercase tracking-[0.3em] text-background bg-muted px-2 py-0.5 rounded-sm">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {timeAgo(comment.created_at)}
                  </p>
                </div>
                <p className={`text-sm font-light leading-relaxed ${comment.is_private ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {comment.message}
                </p>
                {isAdmin && (
                  <button
                    onClick={() => confirmDelete(comment.id)}
                    className="absolute right-0 bottom-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ── Admin PIN Modal ── */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPinModal(false);
                setPinInput('');
              }}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={pinError ? { x: [-10, 10, -10, 10, 0] } : { scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: pinError ? 0.4 : 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-md bg-muted border border-border p-12 text-center"
            >
              <button 
                onClick={() => {
                  setShowPinModal(false);
                  setPinInput('');
                }}
                className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>

              <h3 className="text-2xl font-serif text-foreground uppercase tracking-widest mb-2">Access</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8">Studio Archives</p>

              <form onSubmit={handlePinSubmit} className="space-y-8">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  autoFocus
                  maxLength={4}
                  placeholder="----"
                  className={`w-full bg-transparent border-b ${pinError ? 'border-red-500 text-red-500' : 'border-border focus:border-foreground text-foreground'} outline-none text-center text-2xl tracking-[1em] py-4 placeholder:text-muted-foreground/30 transition-colors duration-300`}
                />
                <button
                  type="submit"
                  className="w-full text-xs uppercase tracking-[0.3em] text-foreground border border-border py-4 hover:bg-foreground hover:text-background transition-colors duration-500"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {commentToDelete && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setCommentToDelete(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-sm bg-muted border border-red-900/50 dark:border-red-900/30 p-12 text-center"
            >
              <h3 className="text-xl font-serif text-foreground uppercase tracking-widest mb-4">Confirm Deletion</h3>
              <p className="text-xs text-muted-foreground font-light mb-10 leading-relaxed">
                Are you sure you want to permanently erase this entry from the archive?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setCommentToDelete(null)}
                  disabled={isDeleting}
                  className="w-full text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground border border-border hover:border-foreground/50 py-3 transition-colors duration-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  disabled={isDeleting}
                  className="w-full text-xs uppercase tracking-[0.3em] text-red-500 border border-red-900/50 dark:border-red-900/30 hover:bg-red-500 hover:text-foreground py-3 transition-colors duration-500 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting' : 'Erase'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
