;; define result variable
(define-data-var result int 0)

;; addition
(define-public (addition (valA int) (valB int))
   (begin
    (var-set result (+ valA valB))
    (ok (var-get result))
   )
)

;; subtraction
(define-public (subtraction (valA int) (valB int))
   (begin
    (var-set result (- valA valB))
    (ok (var-get result))
   )
)

;; division
(define-public (division (valA int) (valB int))
   (begin
    (var-set result (/ valA valB))
    (ok (var-get result))
   )
)

;; multiplication
(define-public (multiplication (valA int) (valB int))
   (begin
    (var-set result (* valA valB))
    (ok (var-get result))
   )
)